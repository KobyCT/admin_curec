import Image from "next/image";
import Link from "next/link";

export default function Product({
  id = null,
  product_name = "Unknown",
  imageSrc = "/ph.png",
  alt = "product",
  seller = "Unknown",
  price,
  tag = [],
}) {
  return (
    <Link href={`/productA/${id}`}>
      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <Image
          src={imageSrc}
          alt={alt}
          width={80}
          height={80}
          className="rounded-lg h:auto"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-medium">{product_name}</h3>
          <p className="text-gray-500 text-sm">{seller}</p>
          <div className={`flex flex-wrap gap-2 mt-2`}>
            {tag.map((t, index) => (
              <div
                key={index}
                className="bg-customPink text-white rounded-full px-3 py-1 flex items-center justify-center"
              >
                <p className="text-white text-sm">{t}</p>
              </div>
            ))}
          </div>
          <p className="font-bold mt-1">{price}</p>
        </div>
      </div>
    </Link>
  );
}
