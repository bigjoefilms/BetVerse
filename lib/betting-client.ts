import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AnchorProvider, Program, Idl, BN } from '@coral-xyz/anchor';
import { connection } from './solana';

// Betting Program ID (you'll need to replace this with your actual program ID)
const BETTING_PROGRAM_ID = new PublicKey('BkEGzSgjk1HyiDfbGFzUYyXAx5gH8wAP2G41dRykRHyL');

// IDL for the betting program
const BETTING_IDL = {
  "version": "0.1.0",
  "name": "underscore",
  "instructions": [
    {
      "name": "placeBet",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "betAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "matchId",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "team",
          "type": "u8"
        },
        {
          "name": "odds",
          "type": "u64"
        }
      ]
    },
    {
      "name": "resolveMatch",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "matchId",
          "type": "string"
        },
        {
          "name": "winner",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createMatch",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "matchId",
          "type": "string"
        },
        {
          "name": "team1",
          "type": "string"
        },
        {
          "name": "team2",
          "type": "string"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "team1Odds",
          "type": "u64"
        },
        {
          "name": "team2Odds",
          "type": "u64"
        },
        {
          "name": "drawOdds",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Match",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "matchId",
            "type": "string"
          },
          {
            "name": "team1",
            "type": "string"
          },
          {
            "name": "team2",
            "type": "string"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "team1Odds",
            "type": "u64"
          },
          {
            "name": "team2Odds",
            "type": "u64"
          },
          {
            "name": "drawOdds",
            "type": "u64"
          },
          {
            "name": "totalBets",
            "type": "u64"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "winner",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Bet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "matchId",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "team",
            "type": "u8"
          },
          {
            "name": "odds",
            "type": "u64"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "potentialWinnings",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "metadata": {
    "address": "BkEGzSgjk1HyiDfbGFzUYyXAx5gH8wAP2G41dRykRHyL"
  }
} as Idl;

export interface Match {
  matchId: string;
  team1: string;
  team2: string;
  startTime: number;
  team1Odds: number;
  team2Odds: number;
  drawOdds: number;
  totalBets: number;
  status: number;
  winner: number;
}

export interface Bet {
  user: PublicKey;
  matchId: string;
  amount: number;
  team: number;
  odds: number;
  status: number;
  potentialWinnings: number;
}

export class BettingClient {
  private program: Program;
  private provider: AnchorProvider;

  constructor(wallet: any) {
    if (!wallet || !wallet.publicKey) {
      throw new Error('Wallet is required and must have a public key');
    }

    this.provider = new AnchorProvider(connection, wallet, {
      commitment: 'confirmed',
      preflightCommitment: 'confirmed',
    });
    
    try {
      this.program = new Program(BETTING_IDL, BETTING_PROGRAM_ID, this.provider);
    } catch (error) {
      console.error('Error initializing betting program:', error);
      throw new Error('Failed to initialize betting program');
    }
  }

  async createMatch(
    matchId: string,
    team1: string,
    team2: string,
    startTime: number,
    team1Odds: number,
    team2Odds: number,
    drawOdds: number
  ): Promise<string> {
    const matchAccount = PublicKey.findProgramAddressSync(
      [Buffer.from('match'), Buffer.from(matchId)],
      this.program.programId
    )[0];
    
    const tx = await this.program.methods
      .createMatch(
        matchId,
        team1,
        team2,
        new BN(startTime),
        new BN(team1Odds),
        new BN(team2Odds),
        new BN(drawOdds)
      )
      .accounts({
        admin: this.provider.wallet.publicKey,
        matchAccount: matchAccount,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async placeBet(
    matchId: string,
    amount: number,
    team: number,
    odds: number
  ): Promise<string> {
    const betAccount = PublicKey.findProgramAddressSync(
      [Buffer.from('bet'), this.provider.wallet.publicKey.toBuffer(), Buffer.from(matchId)],
      this.program.programId
    )[0];
    const matchAccount = this.getMatchAccountPDA(matchId);

    const tx = await this.program.methods
      .placeBet(
        matchId,
        new BN(amount),
        team,
        new BN(odds)
      )
      .accounts({
        user: this.provider.wallet.publicKey,
        matchAccount: matchAccount,
        betAccount: betAccount,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async resolveMatch(matchId: string, winner: number): Promise<string> {
    const matchAccount = this.getMatchAccountPDA(matchId);

    const tx = await this.program.methods
      .resolveMatch(matchId, winner)
      .accounts({
        admin: this.provider.wallet.publicKey,
        matchAccount: matchAccount,
      })
      .rpc();

    return tx;
  }

  async getMatch(matchId: string): Promise<Match | null> {
    try {
      const matchAccount = this.getMatchAccountPDA(matchId);
      const match = await this.program.account.match.fetch(matchAccount);
      return match as Match;
    } catch (error) {
      console.error('Error fetching match:', error);
      return null;
    }
  }

  async getUserBets(userPublicKey: PublicKey): Promise<Bet[]> {
    try {
      const bets = await this.program.account.bet.all([
        {
          memcmp: {
            offset: 8,
            bytes: userPublicKey.toBase58(),
          },
        },
      ]);
      return bets.map(bet => bet.account as Bet);
    } catch (error) {
      console.error('Error fetching user bets:', error);
      return [];
    }
  }

  async getAllMatches(): Promise<Match[]> {
    try {
      const matches = await this.program.account.match.all();
      return matches.map(match => match.account as Match);
    } catch (error) {
      console.error('Error fetching all matches:', error);
      return [];
    }
  }

  private getMatchAccountPDA(matchId: string): PublicKey {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from('match'), Buffer.from(matchId)],
      this.program.programId
    );
    return pda;
  }

  async getBalance(): Promise<number> {
    const balance = await connection.getBalance(this.provider.wallet.publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  async requestAirdrop(amount: number = 1): Promise<string> {
    const signature = await connection.requestAirdrop(
      this.provider.wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
    return signature;
  }
}

// Utility functions
export const formatSol = (lamports: number): string => {
  return (lamports / LAMPORTS_PER_SOL).toFixed(4);
};

export const parseSol = (sol: string): number => {
  return parseFloat(sol) * LAMPORTS_PER_SOL;
};

export const getTeamName = (team: number): string => {
  switch (team) {
    case 0:
      return 'team1';
    case 1:
      return 'team2';
    case 2:
      return 'draw';
    default:
      return 'unknown';
  }
};

export const getMatchStatus = (status: number): string => {
  switch (status) {
    case 0:
      return 'upcoming';
    case 1:
      return 'live';
    case 2:
      return 'finished';
    default:
      return 'unknown';
  }
}; 