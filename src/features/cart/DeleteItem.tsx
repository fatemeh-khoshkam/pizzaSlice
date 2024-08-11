import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import { AppDispatch } from '../../store';

function DeleteItem({ pizzaId }: { pizzaId: number }) {
  const dispatch = useDispatch<AppDispatch>();

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <Button type="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;
