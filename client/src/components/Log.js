import { useState } from 'react';
import '../styles/Workout.css';


function Log({ log, onDeleteLog }) {
    // const { user  } = useOutletContext();
    const [edit, setEdit] = useState(false);
    const [currentLog, setCurrentLog] = useState(log)


    function handleSubmit(e){
        e.preventDefault();
        fetch(`/logs`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentLog)
        })
        .then(resp => resp.json())
        .then(newlog =>{
            // setUser({
            //   ...user,
            //   logs: [...user.logs, newlog]
            // });
            setCurrentLog(newlog)
            setEdit(false)
            console.log(newlog.user)
        })
    }

    function handleDelete() {
        fetch(`/logs`, {  
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: currentLog.id })
        })
        .then(resp => {
            if (resp.ok) {
                onDeleteLog(currentLog.id); //!!
                console.log("Delete success");
            } else {
                console.error("Failed to delete log");
            }
        });
    }
    
    return (
        <div className='log'>
            {edit ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" name="date" placeholder="xx/xx/xxxx"
                            value={currentLog.date}
                            onChange={(e) => setCurrentLog({...currentLog, date: e.target.value})}
                        />

                        <input
                            type="text" name="note" placeholder="Notes for this workout"
                            value={currentLog.note}
                            onChange={(e) => setCurrentLog({...currentLog, note: e.target.value})}
                        />
                        <button type="submit">Submit</button>
                    </form>

                    <button color="secondary" onClick={() => setEdit(false)}>
                        Edit
                    </button>
                </>
            ) : (
                <>
                    <div>
                        <h3>Date:{currentLog.date}</h3>
                        <h3>Note:{currentLog.note}</h3>
                        <button color="secondary" onClick={() => setEdit(true)}>
                            Edit
                        </button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Log;