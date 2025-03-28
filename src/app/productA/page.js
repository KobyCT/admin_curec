import ProductInspection from "./clientcomp";
import Products from "./getProduct";

export default async function ProductPage({ searchParams }) {
  const type = (await searchParams).type || "Unapproved";

  return (
    <ProductInspection>
      <div>{type}</div>
      <Products type={type} />
    </ProductInspection>
  );
}
