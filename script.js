const DNAInput = document.getElementById("DNAInput");
const DNASubmitButton = document.getElementById("DNASubmitButton");
const DNAOutput = document.getElementById("DNAOutput");
const mRNAOutput = document.getElementById("mRNAOutput");
const tRNAOutput = document.getElementById("tRNAOutput");
const aminoAcidOutput = document.getElementById("aminoAcidOutput");

DNASubmitButton.addEventListener("click", function() {
    const sequence = DNAInput.value.toUpperCase();
    const complementaryDNASequence = complementaryDNA(sequence);
    const mRNASequence = complementaryMRNA(sequence);
    const tRNASequence = complementaryTRNA(sequence);
    const aminoAcidSequence = translateMRNA(mRNASequence);
    DNAOutput.textContent = complementaryDNASequence;
    mRNAOutput.textContent = mRNASequence;
    tRNAOutput.textContent = tRNASequence;
    aminoAcidOutput.textContent = aminoAcidSequence
});


function complementaryDNA(sequence) {
    let result = "";

    for (let i = 0; i < sequence.length; i++) {
        let base = sequence[i];

        if (base === "A") {
            result += "T";
        }
        else if (base === "T") {
            result += "A";
        }
        else if (base === "C") {
            result += "G";
        }
        else if (base === "G") {
            result += "C";
        }
        else {
            result += "?"; // Invalid character
        }
    }

    return result;
}

function complementaryMRNA(sequence) {
    let result = "";
    let count = 0;

    for (let i = 0; i < sequence.length; i++) {
        let base = sequence[i];
        if (count == 3) {
            result += " "
            count = 0
        }

        if (base === "A") {
            result += "U";
        }
        else if (base === "T") {
            result += "A";
        }
        else if (base === "C") {
            result += "G";
        }
        else if (base === "G") {
            result += "C";
        }
        else {
            result += "?"; // Invalid character
            count -= 1;
        }
        count += 1;
    }

    return result;
}

function complementaryTRNA(sequence) {
    let result = "";
    let count = 0;

    for (let i = 0; i < sequence.length; i++) {
        let base = sequence[i];
        if (count == 3) {
            result += " "
            count = 0
        }

        if (base === "A") {
            result += "A";
        }
        else if (base === "T") {
            result += "U";
        }
        else if (base === "C") {
            result += "C";
        }
        else if (base === "G") {
            result += "G";
        }
        else {
            result += "?"; // Invalid character
            count -= 1;
        }
        count += 1;
    }

    return result;
}
function translateMRNA(mRNA) {
    const codonTable = {
        UUU: "Phe", UUC: "Phe",
        UUA: "Leu", UUG: "Leu",
        CUU: "Leu", CUC: "Leu", CUA: "Leu", CUG: "Leu",
        AUU: "Ile", AUC: "Ile", AUA: "Ile",
        AUG: "Met",

        GUU: "Val", GUC: "Val", GUA: "Val", GUG: "Val",

        UCU: "Ser", UCC: "Ser", UCA: "Ser", UCG: "Ser",
        AGU: "Ser", AGC: "Ser",

        CCU: "Pro", CCC: "Pro", CCA: "Pro", CCG: "Pro",

        ACU: "Thr", ACC: "Thr", ACA: "Thr", ACG: "Thr",

        GCU: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala",

        UAU: "Tyr", UAC: "Tyr",
        UAA: "Stop", UAG: "Stop",

        CAU: "His", CAC: "His",
        CAA: "Gln", CAG: "Gln",

        AAU: "Asn", AAC: "Asn",
        AAA: "Lys", AAG: "Lys",

        GAU: "Asp", GAC: "Asp",
        GAA: "Glu", GAG: "Glu",

        UGU: "Cys", UGC: "Cys",
        UGA: "Stop",
        UGG: "Trp",

        CGU: "Arg", CGC: "Arg", CGA: "Arg", CGG: "Arg",
        AGA: "Arg", AGG: "Arg",

        GGU: "Gly", GGC: "Gly", GGA: "Gly", GGG: "Gly"
    };

    return mRNA.split(/\s+/)
        .map(group => {
            // Remove invalid characters and convert to uppercase
            group = group.toUpperCase().replace(/[^AUGC]/g, "");

            // Handle incomplete codons
            if (group.length < 3 && group.length > 0) {
                return "(cut off)";
            }

            // Use only the first 3 letters
            const codon = group.slice(0, 3);

            return codonTable[codon];
        })
        .join(" ");
}