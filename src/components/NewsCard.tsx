import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";

export interface NewsCardProps {
  title: string;
  image: string;
  description: string;
  url: string;
}

export function NewsCard({ title, image, description, url }: NewsCardProps) {
  return (
    <Link
      href={`${url}?ref=innoscripta-aggregator`}
      target="_blank"
      className="w-[100%] md:w-[45%] lg:w-[30%] h-[420px] cursor-pointer "
    >
      <Card className="h-full">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
          <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl h-[150px] w-full"
            src={image}
            width={270}
            height={150}
          />
          <div className="text-ellipsis max-h-14 py-2 overflow-hidden">
            {description}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
