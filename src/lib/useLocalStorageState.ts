import { useEffect, useState } from "react";

/**
 * useState와 동일한 API를 갖는 localStorage 기반 상태 훅.
 *
 * 데모 목적의 로컬 영속화 계층이다 — 실제 DB는 아니다. 같은 탭 안에서 새로고침해도
 * 값이 유지되고, 같은 출처의 다른 탭/iframe(관리자 데모와 고객 홈페이지가 각각 다른
 * 브라우징 컨텍스트로 열렸을 때)에도 `storage` 이벤트로 변경사항이 전파된다.
 * `storage` 이벤트는 변경을 발생시킨 탭 자신에게는 발생하지 않으므로, 다른 탭/iframe만
 * 감지하면 되는 이 용도에 정확히 맞는다.
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // 저장 공간 초과, 프라이빗 모드 등 — 데모 데이터이므로 조용히 무시한다.
    }
  }, [key, state]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.newValue === null) return;
      try {
        setState(JSON.parse(event.newValue) as T);
      } catch {
        // 형식이 다른 값이 들어온 경우 무시한다.
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [state, setState] as const;
}
