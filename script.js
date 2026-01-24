async function checkAura() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    if (!username) return;

    // Elements ko cache karein taaki baar-baar DOM query na karni pade (Performance boost)
    const elements = {
        avatar: document.getElementById('avatar'),
        name: document.getElementById('name'),
        login: document.getElementById('login'),
        score: document.getElementById('score'),
        repoCount: document.getElementById('repoCount'),
        followerCount: document.getElementById('followerCount'),
        rankBadge: document.getElementById('rankBadge'),
        rankTitle: document.getElementById('rankTitle'),
        auraQuote: document.getElementById('auraQuote'),
        captureArea: document.getElementById('captureArea'),
        downloadBtn: document.getElementById('downloadBtn'),
        error: document.getElementById('error')
    };

    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();

        // Scoring Logic
        let score = (data.public_repos * 15) + (data.followers * 30) + (data.public_gists * 10);
        const yearsOld = new Date().getFullYear() - new Date(data.created_at).getFullYear() || 1;
        score += (yearsOld * 250);

        // Update Content
        elements.avatar.src = data.avatar_url;
        elements.name.textContent = data.name || data.login;
        elements.login.textContent = `@${data.login}`;
        elements.score.textContent = score.toLocaleString();
        elements.repoCount.textContent = `${data.public_repos} REPOS`;
        elements.followerCount.textContent = `${data.followers} FOLLOWERS`;

        // Efficient Rank Selection (Highest to Lowest)
        const rankLevels = [
            { min: 20000, rank: "DIVINE ARCHITECT", quote: "You have transcended the digital reality." },
            { min: 15000, rank: "OMNIPOTENT", quote: "The binary world bows to your command." },
            { min: 12000, rank: "GALAXY CONQUEROR", quote: "Your repositories span across the stars." },
            { min: 10000, rank: "ZENITH", quote: "The peak of human logic and creativity." },
            { min: 9000,  rank: "GIT GOD", quote: "The ultimate architect of the digital universe." },
            { min: 8000,  rank: "ETHEREAL", quote: "Floating above the common codebase." },
            { min: 7000,  rank: "CELESTIAL", quote: "Your code shines brighter than a thousand stars." },
            { min: 6000,  rank: "IMMORTAL", quote: "Bugs fear your name across generations." },
            { min: 5000,  rank: "MYTHIC", quote: "A living legend in the world of bits and bytes." },
            { min: 4500,  rank: "WIZARD", quote: "Turning complex logic into pure magic." },
            { min: 4000,  rank: "TITAN", quote: "Dominating the repositories with raw power." },
            { min: 3500,  rank: "OVERLORD", quote: "Ruling the open-source kingdom." },
            { min: 3000,  rank: "PALADIN", quote: "A champion of clean and scalable code." },
            { min: 2500,  rank: "ELITE", quote: "Superior code logic and architectural mastery." },
            { min: 2000,  rank: "VETERAN", quote: "Years of commits carved into your soul." },
            { min: 1750,  rank: "COMMANDER", quote: "Leading the march towards production." },
            { min: 1500,  rank: "MASTER", quote: "Commanding the syntax like a true professional." },
            { min: 1250,  rank: "CHAMPION", quote: "Victory is written in every pull request." },
            { min: 1000,  rank: "GOLD", quote: "Crafting digital solutions with high precision." },
            { min: 850,   rank: "VANGUARD", quote: "At the frontlines of innovation." },
            { min: 750,   rank: "SENTINEL", quote: "Guarding the codebase with clean logic." },
            { min: 650,   rank: "KNIGHT", quote: "Honorable commits and sturdy logic." },
            { min: 500,   rank: "WARRIOR", quote: "Fighting bugs and shipping features daily." },
            { min: 400,   rank: "GLADIATOR", quote: "In the arena of logic, you never back down." },
            { min: 300,   rank: "SCOUT", quote: "Exploring the vast world of open source." },
            { min: 200,   rank: "INITIATE", quote: "The journey of a thousand miles starts here." },
            { min: 100,   rank: "RECRUIT", quote: "Learning the ways of the terminal." },
            { min: 0,     rank: "POOKIE", quote: "New to the game, but the potential is huge!" }
        ];

        const { rank, quote } = rankLevels.find(level => score >= level.min) || rankLevels[rankLevels.length - 1];

        elements.rankBadge.textContent = `LEVEL ${yearsOld}`;
        elements.rankTitle.textContent = rank;
        elements.auraQuote.textContent = `"${quote}"`;

        // UI visibility
        elements.captureArea.classList.remove('hidden');
        elements.downloadBtn.classList.remove('hidden');
        elements.error.classList.add('hidden');

        // Promotion snippet call
        if (typeof showShareSnippet === "function") showShareSnippet(data.login, rank);

    } catch (err) {
        elements.error.classList.remove('hidden');
        elements.captureArea.classList.add('hidden');
        elements.downloadBtn.classList.add('hidden');
    }
}

function downloadCard() {
    const area = document.getElementById('captureArea');
    if (!area) return;

    html2canvas(area, {
        backgroundColor: "#020617",
        scale: 2, // 3 scale mobile par bohot bada file bana sakta hai, 2 is optimal.
        useCORS: true,
        logging: false // Disable console logs for production
    }).then(canvas => {
        const link = document.createElement('a');
        const login = document.getElementById('login').innerText || 'user';
        link.download = `GitAura-${login}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

