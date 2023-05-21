import styles from "./Multiselect.module.scss";

import {
  useRef,
  useState,
  useEffect,
  FocusEventHandler,
  useCallback,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";
import classNames from "classnames";

import { useDebounce } from "../../hooks/useDebounce";
import { useMultiselectController } from "./useMultiselectController";

import { isOneOf, convertHighlightedToId } from "./Components/utils";

import { FocusAt, Theme } from "./Components/enums";

import ListBoxPopUp from "./Components/ListBoxPopUp";
import { MagnifyingGlass, Plus } from "./Components/SVGs";

/*
    Мультиселект с текстовым фильтром
*/

export function SuggestedSearch(props: SuggestedSearchProps) {
  const { id, lable, options, toggleOption, height, setOuterInput, theme } =
    props;

  const [expanded, setExpanded] = useState(false);
  // Focus is used to make sure that we won't lose input focus during actions
  const [focus, setFocus] = useState(false);

  // Text from input
  const [inputText, setInputText] = useState<string>("");
  const debouncedInput = useDebounce(inputText, 200);

  const [controller, viewer] = useMultiselectController(options, toggleOption);

  const inputRef = useRef<HTMLInputElement>(null);
  const fullBoxRef = useRef<HTMLInputElement>(null);
  const comboMenuRef = useRef<HTMLDivElement>(null);

  // Handle debounceUpdate

  useEffect(() => {
    setOuterInput(debouncedInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  // Control handlers

  const handleFocus: FocusEventHandler = useCallback(() => {
    setFocus(true);
    setExpanded(true);
  }, []);

  const handleClick: MouseEventHandler = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleBlur: FocusEventHandler = useCallback(
    (event) => {
      const fullBox = fullBoxRef.current;
      if (fullBox === null) return;

      if (!fullBox.contains(event.relatedTarget as HTMLElement)) {
        setFocus(false);
        setExpanded(false);
        controller.loseFocus();
      } else {
        setTimeout(() => inputRef.current?.focus(), 10);
      }
    },
    [controller]
  );

  const handleKeyDownCollapsed: KeyboardEventHandler = useCallback(
    (event) => {
      if (options.size === 0) return;

      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "Enter":
          event.preventDefault();
          setExpanded(true);
      }
    },
    [options]
  );

  const handleKeyDownExpanded: KeyboardEventHandler = useCallback(
    (event) => {
      if (
        !isOneOf(event.key, [
          "Enter",
          "Escape",
          "ArrowDown",
          "ArrowUp",
          "PageUp",
          "PageDown",
        ])
      )
        return;

      event.preventDefault();

      switch (event.key) {
        case "Enter":
          return controller.toggle();
        case "Escape":
          controller.loseFocus();
          return setExpanded(false);
        case "ArrowDown":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnStart();
          else return controller.focusDown(1);
        case "ArrowUp":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnStart();
          else return controller.focusUp(1);
        case "PageUp":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnStart();
          else return controller.focusUp(10);
        case "PageDown":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnEnd();
          else return controller.focusDown(10);
      }
    },
    [controller]
  );

  // ClassNames

  const comboboxClass = classNames(styles.ComboboxHead, {
    [styles.Expanded]: expanded && options.size !== 0,
    [styles.Blue]: theme === Theme.Blue,
    [styles.Simple]: theme === Theme.Simple,
    [styles.Form] : theme === Theme.Form,
  });
  const inputClass = classNames(styles.Input, {
    [styles.Focused]: focus,
  });

  return (
    <div ref={fullBoxRef} className={styles.Combobox}>
      <div className={comboboxClass}>
        {theme !== Theme.Simple ? <MagnifyingGlass /> : 
        <Plus onClick={() => inputRef.current?.focus()}/>}
        <input
          ref={inputRef}
          className={inputClass}
          type="text"
          placeholder={lable}
          id={id}
          // Aria
          role="combobox"
          aria-expanded={expanded && options.size !== 0}
          aria-controls={`${id}-menu`}
          aria-autocomplete="list"
          aria-activedescendant={
            convertHighlightedToId(id, options.size, controller.highlighted) ??
            undefined
          }
          // Event Handlers
          onChange={(event) => setInputText(event.currentTarget.value ?? "")}
          onBlurCapture={handleBlur}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={expanded ? handleKeyDownExpanded : handleKeyDownCollapsed}
        ></input>
      </div>

      <ListBoxPopUp
        expanded={expanded && options.size !== 0}
        ref={comboMenuRef}
        viewer={viewer}
        controller={controller}
        toggleOption={toggleOption}
        parentId={id}
        height={height}
        announce={true}
        theme={theme}
      />
    </div>
  );
}

export function SuggestedSearchSelect(props: SuggestedSearchProps & {startingValue : string}) {
  const { id, lable, options, toggleOption, height, startingValue, setOuterInput, theme } =
    props;

  const [expanded, setExpanded] = useState(false);
  // Focus is used to make sure that we won't lose input focus during actions
  const [focus, setFocus] = useState(false);

  // Text from input
  const [inputText, setInputText] = useState<string>(startingValue);
  const debouncedInput = useDebounce(inputText, 200);

  const [controller, viewer] = useMultiselectController(options, toggleOption);

  const inputRef = useRef<HTMLInputElement>(null);
  const fullBoxRef = useRef<HTMLInputElement>(null);
  const comboMenuRef = useRef<HTMLDivElement>(null);

  // Handle debounceUpdate

  useEffect(() => {
    setOuterInput(debouncedInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  // Control handlers

  const handleFocus: FocusEventHandler = useCallback(() => {
    setFocus(true);
    setExpanded(true);
  }, []);

  const handleClick: MouseEventHandler = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleBlur: FocusEventHandler = useCallback(
    (event) => {
      const fullBox = fullBoxRef.current;
      if (fullBox === null) return;

      if (!fullBox.contains(event.relatedTarget as HTMLElement)) {
        setFocus(false);
        setExpanded(false);
        controller.loseFocus();
      } else {
        setTimeout(() => inputRef.current?.focus(), 10);
      }
    },
    [controller]
  );

  const handleKeyDownCollapsed: KeyboardEventHandler = useCallback(
    (event) => {
      if (options.size === 0) return;

      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "Enter":
          event.preventDefault();
          setExpanded(true);
      }
    },
    [options]
  );

  const handleKeyDownExpanded: KeyboardEventHandler = useCallback(
    (event) => {
      if (
        !isOneOf(event.key, [
          "Enter",
          "Escape",
          "ArrowDown",
          "ArrowUp",
          "PageUp",
          "PageDown",
        ])
      )
        return;

      event.preventDefault();

      switch (event.key) {
        case "Enter":
          setInputText(viewer.indexOptions[controller.highlighted ?? 0]);
          inputRef.current?.blur()
          return controller.toggle();
        case "Escape":
          controller.loseFocus();
          return setExpanded(false);
        case "ArrowDown":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnStart();
          else return controller.focusDown(1);
        case "ArrowUp":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnStart();
          else return controller.focusUp(1);
        case "PageUp":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnStart();
          else return controller.focusUp(10);
        case "PageDown":
          if (controller.focusAt() !== FocusAt.Option)
            return controller.focusOnEnd();
          else return controller.focusDown(10);
      }
    },
    [controller, viewer]
  );

  // ClassNames

  const comboboxClass = classNames(styles.ComboboxHead, {
    [styles.Expanded]: expanded && options.size !== 0,
    [styles.Blue]: theme === Theme.Blue,
    [styles.Simple]: theme === Theme.Simple,
    [styles.Form] : theme === Theme.Form,
  });
  const inputClass = classNames(styles.Input, {
    [styles.Focused]: focus,
  });

  return (
    <div ref={fullBoxRef} className={styles.Combobox}>
      <div className={comboboxClass}>
        {theme !== Theme.Simple ? <MagnifyingGlass /> : 
        <Plus onClick={() => inputRef.current?.focus()}/>}
        <input
          ref={inputRef}
          className={inputClass}
          type="text"
          placeholder={lable}
          id={id}
          value={inputText}
          // Aria
          role="combobox"
          aria-expanded={expanded && options.size !== 0}
          aria-controls={`${id}-menu`}
          aria-autocomplete="list"
          aria-activedescendant={
            convertHighlightedToId(id, options.size, controller.highlighted) ??
            undefined
          }
          // Event Handlers
          onChange={(event) => setInputText(event.currentTarget.value ?? "")}
          onBlurCapture={handleBlur}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={expanded ? handleKeyDownExpanded : handleKeyDownCollapsed}
        ></input>
      </div>

      <ListBoxPopUp
        expanded={expanded && options.size !== 0}
        ref={comboMenuRef}
        viewer={viewer}
        controller={controller}
        toggleOption={(key) => {
          toggleOption(key)
          setInputText(viewer.indexOptions[controller.highlighted ?? 0]);
          inputRef.current?.blur()
        }}
        parentId={id}
        height={height}
        announce={true}
        theme={theme}
      />
    </div>
  );
}
