<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/pjmarz/HAL-9001">
    <img src="images/logo.png" alt="Logo" width="320" height="320">
  </a>

<h3 align="center">HAL-9001</h3>

  <p align="center">
    Your AI-Powered Bar Cart Management System
    <br />
    <a href="https://github.com/pjmarz/HAL-9001/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/pjmarz/HAL-9001/issues">Report Bug</a>
    ·
    <a href="https://github.com/pjmarz/HAL-9001/issues">Request Feature</a>
  </p>
</div>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![PullRequest][pullrequest-shield]][pullrequest-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

## Quickstart

### Prerequisites
- Node.js 18+
- npm 9+

### 1) Setup (monorepo workspaces)
```sh
# From the repo root
cp .env.example .env  # optional for local defaults
npm install
```

### 2) Run in development
```sh
# From the repo root
npm run dev
```
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

### 3) Run with Docker
```sh
cd app/docker
docker compose up --build
```
- Frontend: http://localhost:80
- Backend: http://localhost:3001

## API
- GET `/health` → `{ status: "ok" }`
- GET `/` → welcome + endpoints
- POST `/api/identify` → returns stubbed bottle data
- POST `/api/checkin` → stub ack
- POST `/api/checkout` → stub ack

## Notes
- Frontend uses `REACT_APP_API_BASE` (default `http://localhost:3001`) and CRA dev proxy.
- See `.env.example` for environment variables.

## About The Project

[![Product Name Screen Shot][product-welcome]](https://github.com/pjmarz/HAL-9001)

HAL-9001 is a cutting-edge system that revolutionizes how you manage your spirits collection. By combining advanced imaging technology with AI-powered analysis, it offers an intelligent solution for cataloging and organizing your bar cart.

### Key Features

- 📸 **Smart Image Recognition**: Capture bottle images with high-resolution camera integration
- 🤖 **AI-Powered Analysis**: Leverages OpenAI's ChatGPT for intelligent data extraction
- 📊 **Comprehensive Data Collection**: Automatically extracts:
  - Brand and model information
  - Alcohol by volume (ABV)
  - Suggested retail price
  - Bottle details and characteristics
- 📱 **Modern User Interface**: Built with React for a seamless user experience
- 🔄 **Real-time Processing**: Efficient Node.js backend for quick data processing

### Built With

- [![React][React]][React-url] - Frontend framework
- [![Node.js][Node.js]][Node.js-url] - Backend runtime
- OpenAI ChatGPT - AI analysis
- High-resolution imaging system

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Peter Marino - [@pjmarz](https://twitter.com/pjmarz) - petermarino2@gmail.com

Project Link: [https://github.com/pjmarz/HAL-9001](https://github.com/pjmarz/HAL-9001)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/pjmarz/HAL-9001.svg?style=for-the-badge
[contributors-url]: https://github.com/pjmarz/HAL-9001/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/pjmarz/HAL-9001.svg?style=for-the-badge
[forks-url]: https://github.com/pjmarz/HAL-9001/network/members
[stars-shield]: https://img.shields.io/github/stars/pjmarz/HAL-9001.svg?style=for-the-badge
[stars-url]: https://github.com/pjmarz/HAL-9001/stargazers
[pullrequest-shield]: https://img.shields.io/github/issues-pr-raw/pjmarz/HAL-9001?style=for-the-badge
[pullrequest-url]: https://github.com/pjmarz/HAL-9001/pulls
[issues-shield]: https://img.shields.io/github/issues/pjmarz/HAL-9001.svg?style=for-the-badge
[issues-url]: https://github.com/pjmarz/HAL-9001/issues
[license-shield]: https://img.shields.io/github/license/pjmarz/HAL-9001.svg?style=for-the-badge
[license-url]: https://github.com/pjmarz/HAL-9001/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/pjmarz/
[product-welcome]: images/welcome.png
[React]: https://img.shields.io/badge/react-grey?style=for-the-badge&logo=react
[React-url]: https://react.dev/
[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=node.js
[Node.js-url]: https://nodejs.org/en