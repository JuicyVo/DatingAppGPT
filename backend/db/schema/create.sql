-- Drop existing tables if they exist
DROP TABLE IF EXISTS Likes;
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Matches;
DROP TABLE IF EXISTS Conversation;
DROP TABLE IF EXISTS UserProfile;

-- Create UserProfile table
CREATE TABLE UserProfile (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    age INTEGER,
    gender TEXT,
    biography TEXT,
    isBot BOOLEAN DEFAULT false,
    matches INTEGER,
    reports INTEGER,
    email VARCHAR(255),
    profilePictureUrl VARCHAR(255),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Conversation table
CREATE TABLE Conversation (
    conversationId SERIAL PRIMARY KEY,
    user1Id INTEGER,
    user2Id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastMessageAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unreadMessagesCount INTEGER DEFAULT 0,
    CONSTRAINT fk_user1 FOREIGN KEY (user1Id) REFERENCES UserProfile(userId),
    CONSTRAINT fk_user2 FOREIGN KEY (user2Id) REFERENCES UserProfile(userId)
);

-- Create Matches table
CREATE TABLE Matches (
    matchId SERIAL PRIMARY KEY,
    user1Id INTEGER,
    user2Id INTEGER,
    matchedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user1 FOREIGN KEY (user1Id) REFERENCES UserProfile(userId),
    CONSTRAINT fk_user2 FOREIGN KEY (user2Id) REFERENCES UserProfile(userId)
);

-- Create Message table
CREATE TABLE Message (
    messageId SERIAL PRIMARY KEY,
    conversationId INTEGER,
    senderId INTEGER,
    receiverId INTEGER,
    content TEXT,
    sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_conversation FOREIGN KEY (conversationId) REFERENCES Conversation(conversationId),
    CONSTRAINT fk_sender FOREIGN KEY (senderId) REFERENCES UserProfile(userId),
    CONSTRAINT fk_receiver FOREIGN KEY (receiverId) REFERENCES UserProfile(userId)
);

-- Create Likes table
CREATE TABLE Likes (
    likeId SERIAL PRIMARY KEY,
    likerId INTEGER,
    likedUserId INTEGER,
    likedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_liker FOREIGN KEY (likerId) REFERENCES UserProfile(userId),
    CONSTRAINT fk_liked_user FOREIGN KEY (likedUserId) REFERENCES UserProfile(userId)
);
