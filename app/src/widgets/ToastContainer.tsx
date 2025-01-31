import React, { memo } from "react";
import ErrorState from "../domain/ephemeral/ErrorState";
import { useBind } from "../hooks";
import Toast from "./Toast";
import * as styles from "./ToastContainer.module.css";

function ToastContainer({ errorState }: { errorState: ErrorState }) {
  useBind(["errors"], errorState);
  const errors = errorState.errors;
  return (
    <div aria-live="polite" aria-atomic="true" className={styles.root}>
      {errors.map((e) => (
        <Toast
          key={e.id}
          id={e.id}
          level={e.level}
          time={e.time}
          message={e.exception.message}
          errorState={errorState}
        />
      ))}
    </div>
  );
}

const ToastContainerMemo = memo(ToastContainer);
export default ToastContainerMemo;
