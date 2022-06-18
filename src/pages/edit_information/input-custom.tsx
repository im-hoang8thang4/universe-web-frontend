export const InputTextElement = (props: any) => {
  const checkEmty = (x: string) => {
    if (x.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  let ok = false;
  if (props.check) {
    ok = checkEmty(props.state);
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <span className="font-semibold">{props.title}</span>
      <input
        type="text"
        className="w-full outline-none rounded-sm p-1 border-solid border-2 border-gray-200"
        placeholder={props.placeholder}
        onChange={(e) => props.setState(e.target.value)}
        value={props.state}
      />
      {ok && <span className="text-red-600">Can not be empty</span>}
    </div>
  );
};
export const InputTextArrayElement = (props: any) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <span className="font-semibold">{props.title}</span>
      <input
        type="text"
        className="w-full outline-none rounded-sm p-1 border-solid border-2 border-gray-200"
        placeholder={props.placeholder}
        onChange={(e) => {
          if (e.target.value === '') {
            props.setState([]);
          } else {
            props.setState([e.target.value]);
          }
        }}
        value={props.state}
      />
    </div>
  );
};
export const InputDateElement = (props: any) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <span className="font-semibold">{props.title}</span>
      <input
        type="date"
        className="outline-none rounded-sm p-1 border-solid border-2 border-gray-200"
        onChange={(e) => props.setState(e.target.value)}
        value={props.state}
      />
    </div>
  );
};
export const TextareaElement = (props: any) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <span className="font-semibold">{props.title}</span>
      <textarea
        placeholder={props.placeholder}
        className="w-full outline-none rounded-sm p-1 border-solid border-2 border-gray-200 h-32"
        onChange={(e) => props.setState(e.target.value)}
        value={props.state}
      ></textarea>
    </div>
  );
};
export const GenderOption = (props: any) => {
  return (
    <div className="flex w-full gap-1 items-center">
      <span className="font-semibold">Gender</span>
      <select
        id="gender"
        className="rounded-sm p-1 border-solid border-2 border-gray-200"
        onChange={(e) => props.setState(e.target.value)}
        value={props.state || 'other'}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export const RelationshipOption = (props: any) => {
  const opts = [
    'none',
    'single',
    'in a relationship',
    'engaged',
    'married',
    'in an open relationship',
    'in a complicated relationship',
  ];
  return (
    <div className="flex w-full gap-1 items-center">
      <span className="font-semibold">Relationship</span>
      <select
        id="relationship"
        className="rounded-sm p-1 border-solid border-2 border-gray-200"
        onChange={(e) => props.setState(e.target.value)}
        value={props.state}
      >
        {opts.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export const InputNumberElement = (props: any) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <span className="font-semibold">{props.title}</span>
      <input
        type="text"
        className="w-full outline-none rounded-sm p-1 border-solid border-2 border-gray-200"
        placeholder={props.placeholder}
        onChange={(e) => props.setState(e.target.value)}
        value={props.phone}
      />
    </div>
  );
};
export const HobbiesOption = (props: any) => {
  const opts = ['football', 'video games', 'read books', 'coding'];
  const state = props.state;
  const handleAdd = (opt: string) => {
    props.setState((prev: string[]) => {
      const isChecked = state.includes(opt);
      if (isChecked) {
        return state.filter((item: string) => item !== opt);
      } else {
        return [...prev, opt];
      }
    });
  };
  return (
    <div className="flex w-full gap-1 items-center">
      <span className="font-semibold pr-5">Hobbies</span>
      <div className="flex flex-col gap-1">
        {opts.map((opt) => (
          <div key={opt}>
            <input type="checkbox" onChange={() => handleAdd(opt)} checked={state.includes(opt)} /> {opt}
          </div>
        ))}
      </div>
    </div>
  );
};
