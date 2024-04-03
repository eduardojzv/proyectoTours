"use client"
import { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Accordion, AccordionItem, CheckboxGroup, Checkbox } from "@nextui-org/react";
import getFilters from '@/utils/getFilters';
import { updateFilters } from '@/utils/updateFilters';
export default function Filter({ tours }) {
  const characteristics = getFilters(tours)
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [filters, setFilters] = useState(parseQueryString() || {});
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

  function formatURL() {
    const params = Object.entries(filters)
      .map(([key, values]) => `${key}=${values.join('-')}`)
      .join('&');

    return `${pathname}?${params}`;
  }
  function parseQueryString() {
    if (params.size === 0) return {}
    const result = {};
    params.forEach((value, key) => {
      const formattedKey = key.toLowerCase().trim();
      if (!result[formattedKey]) {
        const validatedValues = validateUrl(key, value.split("-")) || []
        if (validatedValues.length > 0) {
          result[formattedKey] = validatedValues;
        }
      } else {
        result[formattedKey].push(value);
        console.log("result2", result);
      }
    });
    return result
  }

  function validateUrl(key, values) {
    if (characteristics.hasOwnProperty(key)) {
      const copyValues = [...values].map(item => item.trim().toLowerCase());
      const characteristicsKeys = Object.keys(characteristics[key]).map(item => item.trim().toLowerCase());
      const includedValues = copyValues.filter((i) => characteristicsKeys.includes(i));
      return Object.keys(characteristics[key]).
        filter((item) => includedValues.includes(item.trim().toLowerCase()))
    }
  }
  function checkBoxChange(key, value) {
    const newFilters = updateFilters({ ...filters }, { key, value })
    setFilters(newFilters)
  }
  useEffect(() => {
    replace(formatURL(), { scroll: false });
  }, [filters])
  return (
    <div className="md:w-2/6 h-auto relative">
      {Object.keys(characteristics).length > 0 ? (
        <Accordion variant="splitted" selectionMode="multiple"
          className='sticky top-0'
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {Object.keys(characteristics).map((categoria, index) => (
            <AccordionItem
              key={index}
              aria-label={`Accordion ${index + 1}`}
              title={categoria}
              subtitle={
                <span>
                  filtros: {filters[categoria]?.join(",")}
                </span>
              }>
              <div className="flex flex-col gap-3">
                <CheckboxGroup
                  color="warning"
                  value={filters[categoria] || []}
                  onValueChange={(values) => checkBoxChange(categoria, values)}
                >
                  {Object.entries(characteristics[categoria]).map(([key, value], subIndex) => (
                    <Checkbox key={`${key}+${subIndex}`} value={key}>
                      {key} ({value})
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </AccordionItem>

          ))}
        </Accordion>
      ) : (
        <h1>No hay datos</h1>
      )}


    </div>
  )
}
