import { useState } from "react";
import "./FormComponent.css";
import CategorySelect from "../CategorySelect/CategorySelect";
import RatingField from "../Rating/RatingField";

interface Field {
  category: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface Props {
  fields: Field[];
  onSubmit: (formData: Record<string, string>) => void;
}

// The component takes an array of fields and a function as arguments.
// Each field is a standard html form-tag, the specific tag is specified in the category attribute.
const FormComponent: React.FC<Props> = ({ fields, onSubmit }) => {
  //TODO: Add support for more input categories, like numerical values,
  // and validation.
  const initialFormData: Record<string, string> = {};
  fields.forEach((field) => {
    initialFormData[field.name] = "";
  });

  const [formData, setFormData] =
    useState<Record<string, string>>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      onSubmit(formData);
    } catch (error) {
      console.error(error);
    }
    setFormData(initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="input-group">
            <label htmlFor={field.name} className="formlabel">
              {field.name}:
            </label>

            {field.category === "input" ? (
              <input
                onChange={handleChange}
                value={formData[field.name] || ""}
                id={field.name}
                className="input"
                name={field.name}
                required={field.required}
              />
            ) : field.category === "textarea" ? (
              <textarea
                onChange={handleChange}
                value={formData[field.name] || ""}
                id={field.name}
                className="large-input"
                name={field.name}
                placeholder="So empty..."
                required={field.required}
              />
            ) : field.category === "category" ? (
              <CategorySelect
                onChange={(category) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    [field.name]: category?.id || "",
                  }));
                }}
              />
            ) : field.category === "stars" ? (
              <RatingField
                {...{
                  maxRating: 5,
                  onChange: (rating) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      [field.name]: rating.toString(),
                    })),
                }}
              />
            ) : null}
          </div>
        ))}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default FormComponent;
