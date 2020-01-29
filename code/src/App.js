import React, { useState, useEffect } from "react";
import Filter from "./Components/part2/ex19-20/Filter";
import PeopleForm from "./Components/part2/ex19-20/PeopleForm";
import People from "./Components/part2/ex19-20/People";
import peopleService from "./Services/people";
import Notification from "./Components/Notification";

const App = () => {
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        peopleService.getAll().then(returnedData => setPeople(returnedData));
    }, []);

    const handleOnSubmit = event => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber
        };
        const targetPerson = people.find(person => person.name === newName);
        if (targetPerson === undefined) {
            peopleService.create(nameObject).then(returnedData => {
                setPeople(people.concat(returnedData));
                setMessage(`Added ${returnedData.name}`);
                setTimeout(() => setMessage(null), 3000);
            });
            setNewName("");
            setNewNumber("");
        } else {
            if (
                window.confirm(
                    `${targetPerson.name} is already added to phonebook. Replace the old number with a new one?`
                )
            ) {
                console.log(targetPerson, "targetPerson");
                peopleService
                    .update(targetPerson.id, nameObject)
                    .then(returnedData => {
                        setPeople(
                            people.map(person =>
                                person.id !== returnedData.id
                                    ? person
                                    : returnedData
                            )
                        );
                        setMessage(`Updated ${returnedData.name}`);
                        setTimeout(() => setMessage(null), 3000);
                    });
            }
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter people={people} filter={filter} setFilter={setFilter} />
            <h3>Add a new</h3>
            <PeopleForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                handleOnSubmit={handleOnSubmit}
            />
            <h3>Numbers</h3>
            <People people={people} setPeople={setPeople} />
        </div>
    );
};

export default App;
