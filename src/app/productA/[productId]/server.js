// app/allproduct.js
"use server";
import Photo from "./small";
import Tag from "@/app/components/tag";
import { cookies } from "next/headers";

export default async function UnappProducts({ params }) {
  // Retrieve token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;

  const facultyData = [
    { name: "สถาบันภาษาไทยสิรินธร", id: "01" },
    { name: "ศูนย์การศึกษาทั่วไป", id: "02" },
    { name: "บัณฑิตวิทยาลัย", id: "20" },
    { name: "คณะวิศวกรรมศาสตร์", id: "21" },
    { name: "คณะอักษรศาสตร์", id: "22" },
    { name: "คณะวิทยาศาสตร์", id: "23" },
    { name: "คณะรัฐศาสตร์", id: "24" },
    { name: "คณะสถาปัตยกรรมศาสตร์", id: "25" },
    { name: "คณะพาณิชยศาสตร์และการบัญชี", id: "26" },
    { name: "คณะศึกษาศาสตร์", id: "27" },
    { name: "คณะนิเทศศาสตร์", id: "28" },
    { name: "คณะเศรษฐศาสตร์", id: "29" },
    { name: "คณะแพทยศาสตร์", id: "30" },
    { name: "คณะสัตวแพทยศาสตร์", id: "31" },
    { name: "คณะทันตแพทยศาสตร์", id: "32" },
    { name: "คณะเภสัชศาสตร์", id: "33" },
    { name: "คณะนิติศาสตร์", id: "34" },
    { name: "คณะศิลปกรรมศาสตร์", id: "35" },
    { name: "คณะพยาบาลศาสตร์", id: "36" },
    { name: "คณะสหเวชศาสตร์", id: "37" },
    { name: "คณะจิตวิทยา", id: "38" },
    { name: "คณะวิทยาศาสตร์การกีฬา", id: "39" },
    { name: "โรงเรียนทรัพยากรเกษตร", id: "40" },
    { name: "วิทยาลัยประชากรศาสตร์", id: "51" },
    { name: "วิทยาลัยวิทยาศาสตร์สาธารณสุข", id: "53" },
    { name: "สถาบันภาษา", id: "55" },
    { name: "สถาบันนวัตกรรมบูรณาการแห่งจุฬาลงกรณ์มหาวิทยาลัย", id: "56" },
    {
      name: "สถาบันบัณฑิตบริหารธุรกิจศศินทร์แห่งจุฬาลงกรณ์มหาวิทยาลัย",
      id: "58",
    },
  ];

  const categories = {
    wearable: "เครื่องแต่งกาย",
    gadget: "อุปกรณ์เครื่องใช้ขนาดเล็ก",
    big: "อุปกรณ์เครื่องใช้ขนาดใหญ่",
    books: "หนังสือและเอกสารการเรียน",
    draw: "เครื่องเขียนและอุปกรณ์ศิลปะ",
  };
  function getFacultyCategoryArray(input) {
    if (!Array.isArray(input) || input.length === 0) {
      return []; // Ensure input is a valid array
    }

    const facultyId = input[0]; // Get faculty ID
    const categoryKey = input[1]; // Get category key

    const facultyObj = facultyData.find((f) => f.id === facultyId); // Find faculty object
    const facultyName = facultyObj ? facultyObj.name : undefined; // Extract faculty name

    const categoryName = categories[categoryKey]; // Get category name

    return [facultyName, categoryName].filter(Boolean); // Remove undefined values
  }

  // Fetch product data
  const getProduct = async () => {
    try {
      const res = await fetch(
        `https://backend-cu-recom.up.railway.app/api/products/${params}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store", // Ensure fresh data on each request
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  const data = (await getProduct()).data[0];

  // If no products, show a message
  console.log(data);
  const type = data.tag[1];
  const keysMapping = {
    gadget: [
      "ขนาดกว้างxยาวxสูง",
      "น้ำหนัก",
      "ยี่ห้อและรุ่น",
      "วิธีที่ใช้และข้อมูลเกี่ยวกับการดูแลรักษา",
    ],
    draw: [
      "ขนาดกว้างxยาวxสูง",
      "น้ำหนัก",
      "ยี่ห้อและรุ่น",
      "วิธีที่ใช้และข้อมูลเกี่ยวกับการดูแลรักษา",
    ],
    big: [
      "ขนาดกว้างxยาวxสูง",
      "น้ำหนัก",
      "ยี่ห้อและรุ่น",
      "วิธีที่ใช้และข้อมูลเกี่ยวกับการดูแลรักษา",
    ],
    wearable: [
      "ขนาดตามป้าย",
      "ขนาดแบบละเอียด",
      "ยี่ห้อและรุ่น",
      "วิธีที่ใช้และข้อมูลเกี่ยวกับการดูแลรักษา",
    ],
    books: [
      "ชื่อหนังสือ",
      "ประเภทและเนื้อหาของหนังสือ",
      "ผู้แต่ง",
      "จำนวนหน้า",
    ],
  };
  const des = [
    data.detailonedescription,
    data.detailtwodescription,
    data.detailthreedescription,
    data.detailfourdescription,
  ];
  function mapKeysToDescription(data, descriptiondetail) {
    const tag = data.tag[1]; // Get the first tag

    if (keysMapping[tag]) {
      return keysMapping[tag].reduce((acc, key, index) => {
        if (descriptiondetail[index]) {
          acc[key] = descriptiondetail[index];
        }
        return acc;
      }, {});
    }
    return {}; // Return empty object if no matching tag
  }

  // Example Usage:

  console.log(mapKeysToDescription(data, des));
  const detail = mapKeysToDescription(data, des);

  return (
    <div>
      <div className="flex-1 overflow-auto mt-16 mb-10">
        <div className="relative"></div>

        {/* Product Details */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <Photo image={data.productImageUrls} />
            <Photo image={data.verifyImageUrls} />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <p className="text-gray-500 mt-1">
                {data.sellerFirstNameEN + " " + data.sellerLastNameEN}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">ราคา: {data.price}฿</div>
              {data.oldprice && (
                <div className="text-red-500 line-through text-lg">
                  ราคาเดิม: {data.oldprice}฿
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {getFacultyCategoryArray(data.tag).map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>

          <p className="mt-4 text-lg">รายละเอียด: {data.description}</p>
          <section>
            <h2 className="text-lg font-medium border-b pb-2 mb-4">
              รายละเอียดสินค้า
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(detail).map(([label, value], index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </section>
          {/*Product*/}
          <section>
            <h2 className="text-lg font-medium border-b pb-2 mb-4">
              สภาพสินค้า
            </h2>

            <div className="space-y-2">
              <h1>{data.condition}</h1>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                รายละเอียดสภาพสินค้า
              </label>
              <p className="mt-2">
                {data.conditiondescription === ""
                  ? "-"
                  : data.conditiondescription}
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-medium border-b pb-2 mb-4">
              การจัดส่งสินค้า
            </h2>

            <div className="flex items-center mb-2">
              <span className="block text-sm font-medium">วิธีการจัดส่ง</span>
              <span className="ml-2 text-xs text-gray-500">
                (เช่น Kerry, Flash, ไปรษณีย์ ให้ระบุรายละเอียด)
              </span>
            </div>

            <p>{data.shippingtype}</p>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                ค่าจัดส่งในการจัดส่ง
              </label>
              <p>{data.shippingcost}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
