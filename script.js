   async function checkAura() {
            const username = document.getElementById('username').value.trim();
            if (!username) return;

            try {
                const res = await fetch(`https://api.github.com/users/${username}`);
                if (!res.ok) throw new Error();
                const data = await res.json();

                let score = (data.public_repos * 15) + (data.followers * 30) + (data.public_gists * 10);
                const yearsOld = new Date().getFullYear() - new Date(data.created_at).getFullYear() || 1;
                score += (yearsOld * 250);

                document.getElementById('avatar').src = data.avatar_url;
                document.getElementById('name').innerText = data.name || data.login;
                document.getElementById('login').innerText = `@${data.login}`;
                document.getElementById('score').innerText = score.toLocaleString();
                document.getElementById('repoCount').innerText = `${data.public_repos} REPOS`;
                document.getElementById('followerCount').innerText = `${data.followers} FOLLOWERS`;
// Ranks & Quotes Logic (Updated for 10+ Tiers)
// Score thresholds sorted from Highest to Lowest
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

// Calculation Logic
let rank = "POOKIE";
let quote = "Just started cooking!";

for (let level of rankLevels) {
    if (score >= level.min) {
        rank = level.rank;
        quote = level.quote;
        break; // Stop at the highest possible rank matched
    }
}
                document.getElementById('rankBadge').innerText = `LEVEL ${yearsOld}`;
                document.getElementById('rankTitle').innerText = rank;
                document.getElementById('auraQuote').innerText = `"${quote}"`;

                document.getElementById('captureArea').classList.remove('hidden');
                document.getElementById('downloadBtn').classList.remove('hidden');
                document.getElementById('error').classList.add('hidden');
            } catch (err) {
                document.getElementById('error').classList.remove('hidden');
                document.getElementById('captureArea').classList.add('hidden');
            }
        }

        function downloadCard() {
            const area = document.getElementById('captureArea');
            html2canvas(area, {
                backgroundColor: "#020617", // Set dark bg for clean capture
                scale: 3, 
                useCORS: true 
            }).then(canvas => {
                const link = document.createElement('a');
                // Changed filename to GitAura for promotion
                link.download = `GitAura-${document.getElementById('login').innerText}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            });
        }