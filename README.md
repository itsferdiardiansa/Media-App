
# Media Application Monorepo 📸

A scalable, containerized, and serverless media application built using a modern tech stack. This monorepo structure simplifies development, testing, and deployment.

## Tech Stack 🚀

| Dependency       | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| [![SST](https://img.shields.io/badge/SST-Serverless%20Stack-blue?style=flat&logo=aws-lambda)](https://serverless-stack.com/)              | **Serverless Stack (SST)**: Manages AWS resources with serverless deployment.                        |
| [![NestJS](https://img.shields.io/badge/NestJS-Node%20Backend-red?style=flat&logo=nestjs)](https://nestjs.com/)                            | **NestJS**: Backend framework for building server-side applications in TypeScript.                   |
| [![Next.js](https://img.shields.io/badge/Next.js-React%20Frontend-lightgrey?style=flat&logo=nextdotjs)](https://nextjs.org/)               | **Next.js**: Framework for server-rendered React applications.                                       |
| [![TypeScript](https://img.shields.io/badge/TypeScript-JavaScript%20with%20Types-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/) | **TypeScript**: Typed JavaScript for safer and more scalable code.                                   |
| [![Styled Components](https://img.shields.io/badge/Styled--Components-CSS%20in%20JS-orange?style=flat&logo=styled-components)](https://styled-components.com/) | **Styled Components**: CSS-in-JS for styling React components.                                      |
| [![Docker](https://img.shields.io/badge/Docker-Containerization-blue?style=flat&logo=docker)](https://www.docker.com/)                    | **Docker**: Containerizes the app for consistent deployment.                                         |
| [![Nx](https://img.shields.io/badge/Nx-Monorepo%20Management-blueviolet?style=flat&logo=nx)](https://nx.dev/)                            | **Nx Monorepo**: Manages multiple projects and shared libraries within one repo.                    |
| [![pnpm](https://img.shields.io/badge/pnpm-Workspace%20Management-yellowgreen?style=flat&logo=pnpm)](https://pnpm.io/)                   | **pnpm Workspaces**: Efficiently manages dependencies across the monorepo.                           |
| [![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD%20Automation-lightblue?style=flat&logo=github-actions)](https://github.com/features/actions) | **GitHub Actions**: Automates testing, building, and deployment workflows. |

---

## Prerequisites 🔧

| Tool                    | Version      |
| ----------------------- | ------------ |
| [![Node.js](https://img.shields.io/badge/Node.js-16%2B-green?style=flat&logo=nodedotjs)](https://nodejs.org/) | >= 16.x |
| [![pnpm](https://img.shields.io/badge/pnpm-7%2B-yellowgreen?style=flat&logo=pnpm)](https://pnpm.io/)           | Latest version |
| [![Docker](https://img.shields.io/badge/Docker-Latest-blue?style=flat&logo=docker)](https://www.docker.com/)  | Latest version |
| [![AWS CLI](https://img.shields.io/badge/AWS%20CLI-Latest-orange?style=flat&logo=amazon-aws)](https://aws.amazon.com/cli/) | Latest version |
| [![SST CLI](https://img.shields.io/badge/SST%20CLI-Latest-blue?style=flat&logo=aws-lambda)](https://docs.serverless-stack.com/) | Latest version |

---

## Getting Started 🛠️

### Project Structure 📂

```plaintext
media-app/
├── apps/
│   ├── api/              # NestJS Rest API
│   ├── client/           # Next.js Frontend application
│   └── sst-infra/        # SST infrastructure configuration
├── libs/                 # Shared libraries for all apps
├── .github/workflows/    # GitHub Actions for CI/CD
├── Dockerfile            # Docker configuration for containerizing the app
└── pnpm-workspace.yaml   # pnpm workspace configuration
```

### Installation 📝

1. **Clone the repository**:

   ```bash
   git clone https://github.com/itsferdiardiansa/Media-App.git
   cd media-app
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Copy `.env.example` to `.env` in each app (`apps/api`, `apps/client`, etc.) and fill in the required values.

4. **Running the Applications**:

   - **api (NestJS)**:
     ```bash
     Command to run api here...
     ```

   - **client (Next.js)**:
     ```bash
     Command to run clients here...
     ```

   - **SST Infrastructure**:
     To start SST for local development (uses AWS resources):
     ```bash
     Commands to run sst here...
     ```

5. **Docker**:

   Build and run the Docker container:
   ```bash
   Commands to run docker here...
   ```

### Running Tests ✅

Use Nx to run tests for each application:

```bash
Commands to run the test here...
```

### Deployment 🚀

The project uses **GitHub Actions** for CI/CD. Any push to the `main` branch triggers a workflow to:

1. Build the Docker image.
2. Deploy the serverless stack to AWS.

#### Manual Deployment

To manually deploy the SST stack to AWS:

```bash
Command to deploy here...
```

## License 📜

This project is licensed under the MIT License.

---

## Additional Notes 📘

- **Nx Monorepo**: Nx makes managing multiple apps and libraries easier, all in a single repo.
- **pnpm Workspace**: Efficient dependency management, speeding up installation and reducing duplicate packages.
- **GitHub Actions**: CI/CD workflows ensure consistent testing and deployment.
