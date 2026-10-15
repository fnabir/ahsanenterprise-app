import { useRouter } from 'expo-router';
import { useNavigationLoading } from '@/contexts/NavigationLoadingContext';

export function useNavigationWithLoading() {
  const router = useRouter();
  const { startNavigation, stopNavigation } = useNavigationLoading();

  const navigate = (href: Parameters<typeof router.navigate>[0]) => {
    startNavigation();
    requestAnimationFrame(() => {
      router.navigate(href);
    });
  };

  const back = () => {
    const canGoBack = typeof router.canGoBack === 'function' && router.canGoBack();
    if (!canGoBack) {
      stopNavigation();
      return;
    }

    startNavigation();
    requestAnimationFrame(() => {
      if (typeof router.canGoBack === 'function' && router.canGoBack()) {
        router.back();
      } else {
        stopNavigation();
      }
    });
  };

  const replace = (href: Parameters<typeof router.replace>[0]) => {
    startNavigation();
    requestAnimationFrame(() => {
      router.replace(href);
    });
  };

  return { navigate, push: navigate, back, replace };
}
