const OrderCard = ({ order, last }: { order?: any; last?: any }) => {
  return (
    <div
      className={`flex md:hidden items-center justify-between py-3 px-4 bg-white ${
        last && "md:rounded-b-xl"
      }`}
    >
      <div className="flex items-center text-gray-600">
        <div className="md:ml-3 flex flex-col gap-3">
          <p className="font-normal text-xs">
            #{order._id} • {order.date}
          </p>
          <p className="text-sm font-semibold">{order.customer.name}</p>

          <div className="flex">
            <div className="flex md:hidden items-center rounded-xl px-2 py-1 gap-2 bg-gray-100">
              <span className="rounded-full outline-1 p-1.5 bg-gray-500"></span>
              <p className="text-gray-500 text-xs">{order.payment.status}</p>
            </div>

            <div className="flex md:hidden items-center rounded-xl px-2 py-1 gap-2 bg-yellow-100">
              <span className="rounded-full outline-1 p-1.5 bg-yellow-500"></span>
              <p className="text-gray-500 text-xs">{order.fulfillment}</p>
            </div>
          </div>

          <p className="text-sm font-semibold">{order.items && order.items + " items • "}</p>
        </div>
      </div>

      <div className="flex md:items-center items-top">
        <p className="text-sm font-semibold text-gray-500">{order.total}</p>
      </div>
    </div>
  );
};

export default OrderCard;
