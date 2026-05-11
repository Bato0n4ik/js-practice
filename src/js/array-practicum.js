class FootballClub extends Array{

    constructor(name, ...members){
        super(...members);
        this.name = name;
    }

    static print(object){
        const p = document.createElement('p');
        p.textContent = object;
        document.body.appendChild(p);
    }

    toString() {
        return `Team name :${this.name}, team members: ${this.join(", ")}`;
    }

    arrayLength(){
        return this.filter(() => true).length;
    }
}

const footballTeam = new FootballClub("Manchester", "Tom","Lion", "Messi", "Ronaldo", "Ronaldinio", "Arshavin", "Bob");
footballTeam.splice(2, 0, "Tome", "Bob");
FootballClub.print(footballTeam);



const secondDuplicateIndex = footballTeam.map((item, index) => item !== undefined? index: null)
    .filter(index => index!== null)
    .filter(i => footballTeam.indexOf(footballTeam.at(i)) < i)
    .at(0);

FootballClub.print(footballTeam[secondDuplicateIndex]);


