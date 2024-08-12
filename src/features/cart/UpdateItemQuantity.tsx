import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import { AppDispatch } from '../../store';

type UpdateItemQuantityProps = {
  pizzaId: number;
  currentQuantity: number;
};

function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
