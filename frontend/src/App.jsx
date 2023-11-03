import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import image from "./assets/background.png";
import DeleteIcon from "./assets/icons/delete.svg";
import AddIcon from "./assets/icons/add.svg";
import { Modal } from "./components/Modal";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(name, power);

    const hero = { name, power };

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hero),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setName("");
    setPower("");
    setIsOpen(false);
  };

  const handleSelect = (hero) => {
    console.log(hero);

    if (selectedHeroes.includes(hero)) {
      setSelectedHeroes(selectedHeroes.filter((h) => h !== hero));
    } else {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
    console.log(selectedHeroes);
  };

  const handleDelete = () => {
    const ids = selectedHeroes.map((hero) => hero.id);

    fetch("/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setData(data);
        setSelectedHeroes([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Modal open={isOpen} closeModal={() => setIsOpen(false)}>
        <p>Add a superhero</p>
        <form
          action="POST"
          onSubmit={handleOnSubmit}
          className="flex flex-wrap gap-2 p-4 "
        >
          <input
            type="text"
            value={name}
            placeholder="Superhero"
            onChange={(event) => setName(event.target.value)}
            className="px2 py-1 border-2 border-black rounded-sm focus:outline-none"
          />
          <input
            type="text"
            value={power}
            placeholder="Powers"
            onChange={(event) => setPower(event.target.value)}
            className="px2 py-1 border-2 border-black rounded-sm focus:outline-none"
          />
          <input type="submit" value="lägg till" />
        </form>
      </Modal>

      <div
        className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-black bg-opacity-50 rounded w-11/12 md:w-8/12 text-white backdrop-filter backdrop-blur-md ">
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setIsOpen(true)} icon={AddIcon} />
            <Button onClick={handleDelete} icon={DeleteIcon} />
          </div>
          <div className="overflow-auto min-h-[400px] max-h-[400px]">
            <table className="table-fixed border-collapse w-full ">
              <thead>
                <tr>
                  <th className="w-1/12"></th>
                  <th className="w-4/12 text-left px-4 py-2">Name</th>
                  <th className="w-7/12 text-left px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    Power
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((hero, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        className="appearance-none bg-white bg-check h-3 w-3 border border-black-300  checked:bg-fuchsia-700 checked:border-transparent focus:outline-none"
                        checked={selectedHeroes.includes(hero)}
                        onChange={() => handleSelect(hero)}
                      />
                    </td>
                    <td className="px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {hero.name}
                    </td>
                    <td className="px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {hero.power}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
