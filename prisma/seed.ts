import { prisma } from "@/lib/prisma";

console.log("🌱 Seeding database...");

const runtimes = ["nodejs", "bun", "edge"];

for (const runtime of runtimes) {
  await prisma.runtime.upsert({
    where: { name: runtime },
    update: {},
    create: {
      name: runtime,
      versions: {
        // create: versions?.map((v) => ({
        //   version: v.version,
        //   features: {
        //     create: v.features.map((f) => ({
        //       name: f,
        //     })),
        //   },
        // })),
      },
    },
  });

  console.log(`🚘 Seeded runtime '${runtime}'`);
}

const packages = ["next", "react", "eslint", "remix", "msw", "playwright"];

for (const p of packages) {
  await prisma.package.upsert({
    where: { name: p },
    update: {},
    create: {
      name: p,
      versions: {
        // create: versions?.map((v) => ({
        //   version: v.version,
        //   features: {
        //     create: v.features.map((f) => ({
        //       name: f,
        //     })),
        //   },
        // })),
      },
    },
  });

  console.log(`📦 Seeded package '${p}'`);
}

await prisma.canIUse.upsert({
  where: { runtimeA: { name: "nodejs" }, packageA: { name: "next" } },
  update: {},
  create: {
    working: "YES",
    runtimeA: { connect: { name: "nodejs" } },
    packageA: { connect: { name: "next" } },
  },
});

// TODO: nao sei como  fazer isso
// porque ate entao estou conectando A e B
// mas se eu gravar B e A nao seria a mesma coisa....
// talvez seria interessante conctar features e cada feature ter cadastrado aonde ela funciona

await prisma.canIUse.upsert({
  where: { id: "" },
  update: {},
  create: {
    working: "YES",
    packageA: { connect: { name: "react" } },
    packageB: { connect: { name: "next" } },
  },
});

await prisma.$disconnect();
