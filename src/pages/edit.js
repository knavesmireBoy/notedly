import React from 'react';
// import GraphQL dependencies
import { useQuery, useMutation} from '@apollo/client';
    // import the Note component
import Note from '../components/Note';
import NoteForm from '../components/NoteForm';

import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';


const EditNote = props => {
    // store the id found in the url as a variable
    const id = props.match.params.id;
    // define our note query
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    const { data: userdata } = useQuery(GET_ME);
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
          id
        },
        onCompleted: () => {
          props.history.push(`/note/${id}`);
        }
});
          // if the data is loading, display a loading message
    if (loading) return 'Loading...';
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error! Note not found</p>;
    // if successful, pass the data to the note component
    if (userdata && (userdata.me.id !== data.note.author.id)) {
        return <p>You do not have access to edit this note</p>;
    }
    return <NoteForm content={data.note.content} action={editNote} />;
    };
    

export default EditNote;