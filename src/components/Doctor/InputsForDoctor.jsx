import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export const PMDCInputs = ({setRegisterNumber}) => {
  const [pdmc, setPDMC] = useState('');
  const inputs = useRef([]);

  const focusNextInput = (index) => {
    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const handleInputChange = (value, index) => {
    setPDMC((prevPDMC) => {
      const newPDMC = prevPDMC.split('');
      newPDMC[index] = value;
      const updatedCode = newPDMC.join('');
      setRegisterNumber(updatedCode) // Set code using setRegisterNumber prop
      return updatedCode;
    });

    if (value.length === 1) {
      focusNextInput(index);
    }
  };

  const renderInputs = () => {
    const inputBoxes = [];
    for (let i = 0; i < 4; i++) {
      inputBoxes.push(
        <TextInput
          key={i}
          style={Styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange(value, i)}
          value={pdmc[i]}
          ref={(input) => {
            inputs.current[i] = input;
          }}
        />
      );
    }
    return inputBoxes;
  };

  return (
    <View style={Styles.container}>
        <Text>Enter pmdc</Text>
      <View style={Styles.inputContainer}>{renderInputs()}</View>
    </View>
  );
};




export const GMCInputs = ({setRegisterNumber}) => {
    const [GMC, setGMC] = useState('');
    const inputs = useRef([]);
  
    const focusNextInput = (index) => {
      if (inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      }
    };
    const handleInputChange = (value, index) => {
        setGMC((prevGMC) => {
          const newGMC = prevGMC.split('');
          newGMC[index] = value;
          const updatedCode = newGMC.join('');
          setRegisterNumber(updatedCode) // Set code using setRegisterNumber prop
          return updatedCode;
        });
    
        if (value.length === 1) {
          focusNextInput(index);
        }
      };
  
    const renderInputs = () => {
      const inputBoxes = [];
      for (let i = 0; i < 5; i++) {
        inputBoxes.push(
          <TextInput
            key={i}
            style={Styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleInputChange(value, i)}
            value={GMC[i]}
            ref={(input) => {
              inputs.current[i] = input;
            }}
          />
        );
      }
      return inputBoxes;
    };
  
    return (
      <View style={Styles.container}>
        <Text>Enter gmc</Text>
        <View style={Styles.inputContainer}>{renderInputs()}</View>
      </View>
    );
  };


  export const USLMEInputs = ({setRegisterNumber}) => {
    const [USLME, setUSLME] = useState('');
    const inputs = useRef([]);
  
    const focusNextInput = (index) => {
      if (inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      }
    };
  
    const handleInputChange = (value, index) => {
        setUSLME((prevUSLME) => {
          const newUSLME = prevUSLME.split('');
          newUSLME[index] = value;
          const updatedCode = newUSLME.join('');
          setRegisterNumber(updatedCode) // Set code using setRegisterNumber prop
          return updatedCode;
        });
    
        if (value.length === 1) {
          focusNextInput(index);
        }
      };
  
    const renderInputs = () => {
      const inputBoxes = [];
      for (let i = 0; i < 7; i++) {
        inputBoxes.push(
          <TextInput
            key={i}
            style={Styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleInputChange(value, i)}
            value={USLME[i]}
            ref={(input) => {
              inputs.current[i] = input;
            }}
          />
        );
      }
      return inputBoxes;
    };
  
    return (
      <View style={Styles.container}>
        <Text>Enter USLME</Text>
        <View style={Styles.inputContainer}>{renderInputs()}</View>
      </View>
    );
  };
  



  const Styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
    },
    input: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      textAlign: 'center',
      marginHorizontal: 10,
      fontSize: 18,
    },
  });

