import { useDispatch, useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";
import { removeFromCart } from "../../../../slices/cartSlice";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();  

    return (
    <div>
      <h1 className="text-3xl text-richblack-50">Your Cart</h1>
      <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
        {" "}
        {totalItems} courses in cart{" "}
      </p>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourse />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </div>
      )}


     
    </div>
  );
}
