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

await prisma.$disconnect();
