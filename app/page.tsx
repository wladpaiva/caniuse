import { prisma } from "@/lib/prisma";
import UsingTable from "./components/using-table";

export default async function Home() {
  const runtimes = await prisma.runtime.findMany();
  const packages = await prisma.package.findMany();
  const runtimeIds = runtimes.map((item) => item.id);
  const packageIds = packages.map((item) => item.id);

  const canIUse = await prisma.canIUse.findMany({
    where: {
      OR: [
        {
          featureAId: {
            in: runtimeIds,
          },
        },
        {
          packageAId: {
            in: packageIds,
          },
        },
      ],
    },
  });

  return (
    <div className="">
      <UsingTable runtimes={runtimes} packages={packages} canIUse={canIUse} />
    </div>
  );
}
