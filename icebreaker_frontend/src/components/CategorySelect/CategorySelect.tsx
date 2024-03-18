import { useEffect, useState } from "react";
import { getCategories } from "../../api/CategoriesAPI";
import { CategoryData } from "../../types/DatabaseTypes";

const CategorySelect = ({
  onChange,
}: {
  onChange: (category: CategoryData | null) => void;
}) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  return (
    <select
      value={selectedCategory || ""}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        const category = categories.find(
          (category) => category.name === event.target.value
        );
        onChange(category || null);
      }}
    >
      <option value="">Velg en kategori</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
