import { useCallback } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const useGTM = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters,
      });
    }
  }, []);

  const trackButtonClick = useCallback(
    (buttonName: string, location: string, additionalData?: Record<string, any>) => {
      trackEvent('button_click', {
        button_name: buttonName,
        location: location,
        ...additionalData,
      });
    },
    [trackEvent],
  );

  const trackProductAction = useCallback(
    (
      action: string,
      productId?: string,
      productName?: string,
      additionalData?: Record<string, any>,
    ) => {
      trackEvent('product_action', {
        action,
        product_id: productId,
        product_name: productName,
        ...additionalData,
      });
    },
    [trackEvent],
  );

  const trackNavigation = useCallback(
    (destination: string, source?: string) => {
      trackEvent('navigation', {
        destination,
        source,
      });
    },
    [trackEvent],
  );

  const trackCartAction = useCallback(
    (action: string, additionalData?: Record<string, any>) => {
      trackEvent('cart_action', {
        action,
        ...additionalData,
      });
    },
    [trackEvent],
  );

  const trackPurchase = useCallback(
    (transactionId: string, value: number, currency: string = 'BRL', items?: any[]) => {
      trackEvent('purchase', {
        transaction_id: transactionId,
        value,
        currency,
        items,
      });
    },
    [trackEvent],
  );

  return {
    trackEvent,
    trackButtonClick,
    trackProductAction,
    trackNavigation,
    trackCartAction,
    trackPurchase,
  };
};
