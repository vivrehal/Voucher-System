# Voucher System

A voucher system to manage user registration, login, and voucher operations, including adding, deleting, and applying vouchers with validations. Built with Express.js (Node.js), React (Vite), and SQLite.

## Features

- User Registration and Login
- JWT-based Authentication
- Voucher Management (Add, Delete, Apply)
- Single Voucher Application per User
- Minimum Order Value for Voucher Application
- Voucher Usage Limits (Per User and Global)

## Technologies

- **Server**: Express.js (Node.js)
- **Database**: SQLite
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js and npm
- SQLite

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vivrehal/Voucher-System.git
    cd voucher-system
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Configure the environment**:
    Create a `.env` file in the `server` directory:
    ```plaintext
    PORT= 5000
    DB_HOST= your sqllite host
    DB_USER= your db usernamme
    DB_PASSWORD= your db password if any
    DB_NAME= db name
    JWT_SECRET= 'secret'
    ```

### Running the Application

1. **Start the server**:
    ```bash
    cd server
    npm start
    ```

The server will run on `http://localhost:5000` and the client on `http://localhost:3000`.

## API Endpoints

### User Authentication

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`

### Vouchers

- **Add Voucher**: `POST /api/vouchers`
- **Delete Voucher**: `DELETE /api/vouchers/:id`
- **Apply Voucher**: `POST /api/vouchers/apply`

## Directory Structure

- **Server**: `server` directory (API routes, models, authentication)
- **Database**: SQLite setup and migrations in `server/db`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---
