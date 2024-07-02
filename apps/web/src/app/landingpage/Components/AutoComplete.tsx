import { Button } from 'flowbite-react';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

const AutoComplete = () => {
  return (
    <div className="mt-6">
      <form className="w-[250px] lg:w-auto relative">
        <div className="relative">
          <input
            type="search"
            placeholder="Search Event"
            className="w-full p-4 rounded-full bg-milk"
          />
          <Button className="absolute right-1 top-1/2 -translate-y-1/2 p-3 bg-orangee rounded-full text-black text-xl   ">
            <FiSearch />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AutoComplete;
