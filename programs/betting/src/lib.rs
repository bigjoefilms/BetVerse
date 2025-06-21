use anchor_lang::prelude::*;

declare_id!("BkEGzSgjk1HyiDfbGFzUYyXAx5gH8wAP2G41dRykRHyL");

#[program]
pub mod betting {
    use super::*;

    pub fn create_match(
        ctx: Context<CreateMatch>,
        match_id: String,
        team1: String,
        team2: String,
        start_time: i64,
        team1_odds: u64,
        team2_odds: u64,
        draw_odds: u64,
    ) -> Result<()> {
        let match_account = &mut ctx.accounts.match_account;
        
        match_account.match_id = match_id;
        match_account.team1 = team1;
        match_account.team2 = team2;
        match_account.start_time = start_time;
        match_account.team1_odds = team1_odds;
        match_account.team2_odds = team2_odds;
        match_account.draw_odds = draw_odds;
        match_account.total_bets = 0;
        match_account.status = 0; // 0 = upcoming, 1 = live, 2 = finished
        match_account.winner = 255; // 255 = not set
        
        msg!("Match created: {}", match_account.match_id);
        Ok(())
    }

    pub fn place_bet(
        ctx: Context<PlaceBet>,
        match_id: String,
        amount: u64,
        team: u8,
        odds: u64,
    ) -> Result<()> {
        let bet_account = &mut ctx.accounts.bet_account;
        let match_account = &mut ctx.accounts.match_account;
        
        // Validate team selection
        require!(team <= 2, BettingError::InvalidTeamSelection);
        
        // Validate match status
        require!(match_account.status < 2, BettingError::MatchFinished);
        
        // Calculate potential winnings
        let potential_winnings = amount.checked_mul(odds).unwrap_or(0);
        
        bet_account.user = ctx.accounts.user.key();
        bet_account.match_id = match_id;
        bet_account.amount = amount;
        bet_account.team = team;
        bet_account.odds = odds;
        bet_account.status = 0; // 0 = active, 1 = won, 2 = lost
        bet_account.potential_winnings = potential_winnings;
        
        // Update match total bets
        match_account.total_bets = match_account.total_bets.checked_add(amount).unwrap_or(match_account.total_bets);
        
        msg!("Bet placed: {} SOL on team {} for match {}", 
             amount as f64 / 1_000_000_000.0, team, match_id);
        Ok(())
    }

    pub fn resolve_match(
        ctx: Context<ResolveMatch>,
        match_id: String,
        winner: u8,
    ) -> Result<()> {
        let match_account = &mut ctx.accounts.match_account;
        
        // Validate winner
        require!(winner <= 2, BettingError::InvalidWinner);
        
        match_account.status = 2; // finished
        match_account.winner = winner;
        
        msg!("Match resolved: {} won match {}", winner, match_id);
        Ok(())
    }

    pub fn claim_winnings(
        ctx: Context<ClaimWinnings>,
        bet_id: String,
    ) -> Result<()> {
        let bet_account = &mut ctx.accounts.bet_account;
        let match_account = &ctx.accounts.match_account;
        
        // Check if bet is active
        require!(bet_account.status == 0, BettingError::BetAlreadyProcessed);
        
        // Check if match is finished
        require!(match_account.status == 2, BettingError::MatchNotFinished);
        
        // Determine if bet won
        if bet_account.team == match_account.winner {
            bet_account.status = 1; // won
            msg!("Bet won! Claiming {} SOL", bet_account.potential_winnings as f64 / 1_000_000_000.0);
        } else {
            bet_account.status = 2; // lost
            msg!("Bet lost");
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(match_id: String)]
pub struct CreateMatch<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + 32 + 100 + 100 + 8 + 8 + 8 + 8 + 8 + 1 + 1, // discriminator + match_id + team1 + team2 + start_time + odds + total_bets + status + winner
        seeds = [b"match", match_id.as_bytes()],
        bump
    )]
    pub match_account: Account<'info, Match>,
    
    #[account(mut)]
    pub admin: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(match_id: String)]
pub struct PlaceBet<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 32 + 8 + 1 + 8 + 1 + 8, // discriminator + user + match_id + amount + team + odds + status + potential_winnings
        seeds = [b"bet", user.key().as_ref(), match_id.as_bytes()],
        bump
    )]
    pub bet_account: Account<'info, Bet>,
    
    #[account(
        mut,
        seeds = [b"match", match_id.as_bytes()],
        bump,
        constraint = match_account.match_id == match_id
    )]
    pub match_account: Account<'info, Match>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(match_id: String)]
pub struct ResolveMatch<'info> {
    #[account(
        mut,
        seeds = [b"match", match_id.as_bytes()],
        bump,
        constraint = match_account.match_id == match_id
    )]
    pub match_account: Account<'info, Match>,
    
    pub admin: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(bet_id: String)]
pub struct ClaimWinnings<'info> {
    #[account(
        mut,
        seeds = [b"bet", user.key().as_ref(), bet_account.match_id.as_bytes()],
        bump,
        constraint = bet_account.user == user.key()
    )]
    pub bet_account: Account<'info, Bet>,
    
    #[account(
        seeds = [b"match", bet_account.match_id.as_bytes()],
        bump
    )]
    pub match_account: Account<'info, Match>,
    
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Match {
    pub match_id: String,
    pub team1: String,
    pub team2: String,
    pub start_time: i64,
    pub team1_odds: u64,
    pub team2_odds: u64,
    pub draw_odds: u64,
    pub total_bets: u64,
    pub status: u8, // 0 = upcoming, 1 = live, 2 = finished
    pub winner: u8, // 0 = team1, 1 = team2, 2 = draw, 255 = not set
}

#[account]
pub struct Bet {
    pub user: Pubkey,
    pub match_id: String,
    pub amount: u64,
    pub team: u8, // 0 = team1, 1 = team2, 2 = draw
    pub odds: u64,
    pub status: u8, // 0 = active, 1 = won, 2 = lost
    pub potential_winnings: u64,
}

#[error_code]
pub enum BettingError {
    #[msg("Invalid team selection")]
    InvalidTeamSelection,
    #[msg("Match is already finished")]
    MatchFinished,
    #[msg("Invalid winner")]
    InvalidWinner,
    #[msg("Bet already processed")]
    BetAlreadyProcessed,
    #[msg("Match not finished")]
    MatchNotFinished,
} 