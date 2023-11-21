import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, FC } from 'react';

export interface OrderList {
  timestamp: string;
  items: { id: any; quantity: any }[];
}


export interface OrderContextProps {
  orderList: OrderList | undefined;
  setOrderList: Dispatch<SetStateAction<OrderList | undefined>>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [orderList, setOrderList] = useState<OrderList | undefined>(undefined);

  const contextValue: OrderContextProps = {
    orderList,
    setOrderList,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

