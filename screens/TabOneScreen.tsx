import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Exercise } from '../objects/exercise';
import { Workout } from '../objects/workout';



export default class TabOneScreen extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = new Workout();

  }

  addRow() {

    this.setState(prevState => {
      let newWorkout = Object.assign({}, prevState);  
      newWorkout.exercises.push(new Exercise());              
      return { newWorkout };
    });
  }

  async save() {
    const getItem = await AsyncStorage.getItem(this.state.id);
    console.log(JSON.parse(getItem))
    try {
      await AsyncStorage.setItem(this.state.id, JSON.stringify(this.state))
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage, e: ' + e)
    }
  }

  reset() {
    this.setState(prevState => {
      const newWorkout = new Workout();
      return { newWorkout };
    });
  }

  handleExerciseInputChange(index: number, event: any)
  {
    const { name, value } = event.target;
    this.setState(prevState => {
      const exercise = { ...prevState.exercises[index] };
      exercise[name] = value;
      const newState = { ...prevState };
      newState.exercises[index] = exercise;
      return { ...prevState };
    });
  }

  handleRepsChange(index: number, event: any)
  {

  }

  handleWeightChange(index: number, event: any)
  {

  }

  renderInputs() {
    return this.state.exercises.map((exercise: any, i: number) => {
      return (
        <div key={i}>
          <input name="name" placeholder="Exercise" value={exercise.name} onChange={this.handleExerciseInputChange.bind(this, i)} />
          <input name="reps" placeholder="Reps" value={exercise.reps} onChange={this.handleExerciseInputChange.bind(this, i)} />
          <input name="weight" placeholder="Weight" value={exercise.weight} onChange={this.handleExerciseInputChange.bind(this, i)} />
        </div>
      )
    });
  }

  changeDescription(event: any) {
    let newWorkout = Object.assign({}, this.state);  // creating copy of state variable jasper
    newWorkout.description = event.target.value;
    this.setState( newWorkout );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One - Hello World</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <input placeholder="Description" onChange={this.changeDescription.bind(this)} value={this.state.description} />
        {/* <input type="date" value={this.state.date} /> */}

        { this.renderInputs()}

        <button onClick={this.addRow.bind(this)}>Add Row</button>

        {/* <textarea value={this.state.notes} /> */}

        <button onClick={this.save.bind(this)}>Save</button>
        <button onClick={this.reset.bind(this)}>Reset</button>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

// export function WorkoutTemplate(props: { exercise: Exercise, key: number }) {

//   const [exercise, setExercise] = useState(props.exercise);

//   return (
//     <div key={props.key}>
//       <input placeholder="Exercise" value={props.exercise.name} onChange={e => setExercise( { ...props.exercise, name: e.target.value })} />
//       <input placeholder="Reps" value={props.exercise.reps} onChange={e => setExercise( { ...props.exercise, reps: e.target.value })} />
//       <input placeholder="Weight" value={props.exercise.weight} onChange={e => setExercise( { ...props.exercise, weight: e.target.value })} />
//     </div>
//   )
// }
