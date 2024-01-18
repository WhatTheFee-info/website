import { ActionType, useAppContext } from '../../AppContext';
import { Themes } from '../../types';

export default function ThemeSwitch() {
  const {
    state: { theme },
    dispatch,
  } = useAppContext();

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('event', event.target.value);
    let newTheme: Themes = Themes.light;
    if (theme == Themes.light) {
      newTheme = Themes.dark;
    }
    dispatch({
      type: ActionType.CHANGE_THEME,
      theme: newTheme,
    });
    // now change the class in the <html> element
    if (newTheme == Themes.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <label className="sticky top-4 right-4 inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        value={theme}
        type="checkbox"
        onChange={handleOnChange}
      />
      <div
        className="w-12 h-6 rounded-full ring-0 peer duration-500 
            outline-none bg-gray-200 overflow-hidden 
            shadow-md shadow-gray-400 

            before:flex before:items-center before:justify-center 
            before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 
            before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 
            before:transition-all before:duration-700 
            
            after:flex after:items-center after:justify-center 
            after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full 
            after:top-[2px] after:right-1 after:-translate-x-full after:w-5 after:h-5 
            after:opacity-0 after:transition-all after:duration-700 
            
            peer-checked:before:opacity-0 
            peer-checked:before:rotate-90 peer-checked:before:translate-x-full 
             peer-checked:bg-[#383838] 
            peer-checked:after:opacity-100 
            peer-checked:after:rotate-180 peer-checked:after:-translate-x-0"
      ></div>
    </label>
  );
}
