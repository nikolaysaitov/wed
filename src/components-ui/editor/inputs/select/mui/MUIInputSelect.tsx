import {
  Select as BaseSelect,
  SelectListboxSlotProps,
  SelectProps,
  SelectRootSlotProps
} from '@mui/base/Select';
import { ForwardedRef, forwardRef, ReactElement, RefAttributes } from 'react';
import styles from './MUIInputSelect.module.scss';

export const MUISelect = forwardRef(function SelectSuper<
  TValue extends NonNullable<unknown>,
  Multiple extends boolean
>(props: SelectProps<TValue, Multiple>, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <BaseSelect
      {...props}
      ref={ref}
      slots={{
        root: CustomButton,
        listbox: ListBox
      }}
    />
  );
}) as <TValue extends NonNullable<unknown>, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple> & RefAttributes<HTMLButtonElement>
) => ReactElement;

const CustomButton = forwardRef(function CustomButton<
  TValue extends NonNullable<unknown>,
  Multiple extends boolean
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { ownerState, ...other }: SelectRootSlotProps<TValue, Multiple>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button type="button" {...other} className={styles.action} ref={ref}>
      {other.children}
    </button>
  );
});

const ListBox = forwardRef(function ListBox<Value extends {}, Multiple extends boolean>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { ownerState, ...other }: SelectListboxSlotProps<Value, Multiple>,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <ul {...other} className={styles.list} ref={ref}>
      {other.children}
    </ul>
  );
});
