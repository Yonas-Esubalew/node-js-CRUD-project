
# Node.js CRUD Application

A **CRUD (Create, Read, Update, Delete)** application built using Node.js, Express.js, and MongoDB. This project demonstrates how to implement basic CRUD operations with RESTful APIs.

---

## Features

- **Create**: Add new records to the database.
- **Read**: Fetch and display records from the database.
- **Update**: Modify existing records.
- **Delete**: Remove records from the database.
- **RESTful API**: Designed with clean and modular API endpoints.
- **Error Handling**: Comprehensive error handling for user inputs and server responses.
- **Responsive Design**: Includes basic frontend integration (optional).

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Tools**:
  - dotenv (for environment variables)
  - Postman (for API testing)
  - Nodemon (for development)

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yonas-esubalew/nodejs-crud-app.git
   cd nodejs-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory with the following keys:
     ```env
     MONGO_URI= "mongodb+srv://yonasbe999:mKlJA69xeDETOfC9@cluster0.r24523p.mongodb.net/moviesApp?retryWrites=true&w=majority&appName=Cluster0"
     PORT=3000
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. Use Postman or a browser to interact with the API at `http://localhost:3000`.

---

## API Endpoints

### Base URL
`http://localhost:3000/api`

### Endpoints

- **Create**: `POST /items`
  - Request Body:
    ```json
    {
      "name": "Item Name",
      "description": "Item Description"
    }
    ```

- **Read All**: `GET /items`

- **Read One**: `GET /items/:id`

- **Update**: `PUT /items/:id`
  - Request Body:
    ```json
    {
      "name": "Updated Name",
      "description": "Updated Description"
    }
    ```

- **Delete**: `DELETE /items/:id`

---

## File Structure

```
nodejs-crud-app/
├── controllers/
│   ├── itemController.js
├── models/
│   ├── itemModel.js
├── routes/
│   ├── itemRoutes.js
├── app.js
├── package.json
├── .env
└── README.md
```

---

## Usage

1. Start the server.
2. Use Postman or a browser to test the endpoints.
3. Integrate the backend with a frontend for a complete application.

---

## Contributing

Contributions are welcome! If you have suggestions or want to improve the project, feel free to:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.


## Acknowledgements

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

---

## Contact

- **Author**: [Yonas Esubalew](https://github.com/yonas-esubalew)
- **Email**: yonasatwork999@gmail.com
