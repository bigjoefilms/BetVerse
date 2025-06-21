import clientPromise from '@/lib/mongodb'
import { User, Bet, Transaction, KYC, Notification } from '@/lib/models/user'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { isMongoConfigured } from '@/lib/mongodb'

export async function createUser(userData: Omit<User, '_id'>) {
    if (!isMongoConfigured()) {
        throw new Error('MongoDB not configured');
    }
    
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection('users').insertOne({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: false,
        isActive: true,
        role: 'USER',
        balance: 0,
        totalWinnings: 0,
        totalBets: 0,
        totalDeposits: 0,
        totalWithdrawals: 0
    })

    return result
}

export async function getUserById(id: string) {
    if (!isMongoConfigured()) {
        throw new Error('MongoDB not configured');
    }
    
    const client = await clientPromise
    const db = client.db()

    return db.collection('users').findOne({ _id: new ObjectId(id) })
}

export async function createBet(betData: Omit<Bet, '_id'>) {
    if (!isMongoConfigured()) {
        throw new Error('MongoDB not configured');
    }
    
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection('bets').insertOne({
        ...betData,
        placedAt: new Date()
    })

    return result
}

export async function createTransaction(transactionData: Omit<Transaction, '_id'>) {
    if (!isMongoConfigured()) {
        throw new Error('MongoDB not configured');
    }
    
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection('transactions').insertOne({
        ...transactionData,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    return result
}

export async function POST(request: Request) {
    try {
        const { walletAddress } = await request.json();

        if (!walletAddress) {
            return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
        }

        // Check if MongoDB is configured
        if (!isMongoConfigured()) {
            // Return a mock response for demo purposes
            return NextResponse.json({
                message: 'User logged in (demo mode)',
                user: {
                    walletAddress,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isVerified: true,
                    isActive: true,
                    role: 'USER',
                    balance: 1000,
                    totalWinnings: 500,
                    totalBets: 25,
                    totalDeposits: 1500,
                    totalWithdrawals: 0
                }
            });
        }

        const client = await clientPromise;
        const db = client.db();

        // Check if user exists with this wallet
        let user = await db.collection('users').findOne({ walletAddress });

        if (!user) {
            // Create new user if doesn't exist
            const result = await db.collection('users').insertOne({
                walletAddress,
                createdAt: new Date(),
                updatedAt: new Date(),
                isVerified: true,
                isActive: true,
                role: 'USER',
                balance: 0,
                totalWinnings: 0,
                totalBets: 0,
                totalDeposits: 0,
                totalWithdrawals: 0
            });

            user = await db.collection('users').findOne({ _id: result.insertedId });
        }

        return NextResponse.json({
            message: user ? 'User logged in' : 'User created',
            user
        });

    } catch (error) {
        console.error('Error handling wallet connection:', error);
        return NextResponse.json(
            { error: 'Failed to process wallet connection' },
            { status: 500 }
        );
    }
}

// Add more database operations as needed