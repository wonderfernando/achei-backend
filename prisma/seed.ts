import { prismaClient } from "../src/utils/prismaClientLib";

async function main() {
   await prismaClient.age.create({data:{age:"Bebe"}})
   await prismaClient.age.create({data:{age:"Crianca"}})
   await prismaClient.age.create({data:{age:"Adolescente"}})
   await prismaClient.age.create({data:{age:"Jovem Aduto"}})
   await prismaClient.age.create({data:{age:"Adulto meia-idade"}})
   await prismaClient.age.create({data:{age:"Idoso"}})
}

main().catch((e)=>process.exit(1)).finally(()=>prismaClient.$disconnect())