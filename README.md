# GoodBadHabitTracker
![.NET](https://img.shields.io/badge/.NET-8-blue)  ![React](https://img.shields.io/badge/React-v17-blue)  ![SQL Server](https://img.shields.io/badge/SQL%20Server-2019-blue)  ![JWT](https://img.shields.io/badge/JWT-Authentication-blue)  ![FluentValidation](https://img.shields.io/badge/FluentValidation-10.0-blue)  ![Unit Tests](https://img.shields.io/badge/Unit%20Tests-130%2B-green)

## Overview
This project is a **monolithic SaaS application** developed for **habit tracking**. Built with **C#**, using the **ASP.NET Core Framework** (.NET 8) and **React** for the frontend, the application allows users to add, manage, and monitor both positive and negative habits.

### Features:
- **Custom calendar**, **stopwatch**, and **timer** functionalities.
- Ability to **add comments** for habits.
- **User authentication** and **authorization** implemented using **JWT** and **OAuth 2.0** via **Auth0**. The OAuth 2.0 authorization employs **PKCE** to prevent data exposure, enhancing security.
  
### Security Enhancements:
- Additional security layers following **OWASP** guidelines, including an **encoded user context** passed securely in cookies.

### Design Patterns:
- **CQRS** (Command Query Responsibility Segregation) and **Result Pattern** were used for clean architecture and maintainable code.

### Tech Stack:
- **Backend**: C#, ASP.NET Core, JWT, OAuth 2.0, Entity Framework
- **Frontend**: React
- **Database**: SQL Server
- **Validation**: FluentValidation
- **Testing**: XUnit, FluentAssertions, Moq

### Additional Information:
- Over **130 unit tests** written using **XUnit**, **FluentAssertions**, and **Moq** to ensure code quality and reliability.

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
