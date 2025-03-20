import ProductPage from "./clientcomponent";
import UnappProducts from "./server";
export default async function Main({ params }) {
  const { productId } = await params;
  return (
    <div>
      <ProductPage params={productId}>
        <UnappProducts params={productId} />
      </ProductPage>
    </div>
  );
}
