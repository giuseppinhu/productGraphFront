import formatPrice from "../../utils/formatPrice";

interface ProductItemProps {
  name: string;
  sales: string;
  price: number;
}

const ProductItem = ({ name, sales, price }: ProductItemProps) => (
  <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg transition">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Img</div>
      <div>
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-gray-500">{sales} de vendas</p>
      </div>
    </div>
    <span className="text-sm font-semibold text-white">{formatPrice(price)}</span>
  </div>
);

export default ProductItem;