import fs from "node:fs/promises";
await fs.mkdir("public",{recursive:true});
await fs.copyFile("RBD-Catalogue-Web.pdf","public/RBD-Catalogue-Web.pdf");
console.log("[RBD CATALOGUE] Original PDF copied to public downloads.");
