import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { bottles, customers } from './data/gameData';
import GameBoard from './components/GameBoard';
import GameOverScreen from './components/GameOverScreen';
import StartScreen from './components/StartScreen';
import { playCustomerAudio, playGenericAudio } from './utils/audio';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: #2c3e50; */ /* Remove direct background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [gameState, setGameState] = useState({
    currentCustomerIndex: 0,
    score: 0,
    isGameOver: false,
    selectedBottle: null,
    timeLeft: 30,
    showConfirmButton: false,
    isCustomerLeaving: false,
    isGameStarted: false,
    gameOverReason: null
  });

  const startNewGame = () => {
    setGameState({
      currentCustomerIndex: 0,
      score: 0,
      isGameOver: false,
      selectedBottle: null,
      timeLeft: 30,
      showConfirmButton: false,
      isCustomerLeaving: false,
      isGameStarted: true,
      gameOverReason: null
    });
  };

  const handleStartGame = () => {
    console.log("Start Game button clicked");
    setGameState(prev => ({
      ...prev,
      isGameStarted: true
    }));
  };

  const handleBottleSelect = (bottle) => {
    // Only allow selection if no bottle is currently selected OR if customer is leaving
    if (!gameState.selectedBottle && !gameState.isCustomerLeaving) {
      console.log("Bottle selected:", bottle.name);
      playGenericAudio('pickup.wav');
      setGameState(prev => ({
        ...prev,
        selectedBottle: bottle,
        showConfirmButton: true
      }));
    } else {
      console.log("Cannot select bottle, another is already selected or customer is leaving.");
    }
  };

  const handleBottleDeselect = () => {
    // Prevent deselecting while customer is leaving
    if (gameState.isCustomerLeaving) {
      console.log("Cannot deselect while customer is leaving.");
      return;
    }
    console.log("Bottle deselected");
    playGenericAudio('remove.wav');
    setGameState(prev => ({
      ...prev,
      selectedBottle: null,
      showConfirmButton: false
    }));
  };

  const handleConfirm = () => {
    // Prevent multiple confirms or confirming while leaving
    if (gameState.isCustomerLeaving || !gameState.selectedBottle) {
      console.log("Confirm blocked: Already leaving or no bottle selected.")
      return; 
    }

    const currentCustomer = customers[gameState.currentCustomerIndex];
    const isCorrect = currentCustomer.expected.includes(gameState.selectedBottle.name);

    if (isCorrect) {
      console.log("Correct answer confirmed for", currentCustomer.name);
      playGenericAudio('coin.wav');
      playCustomerAudio(currentCustomer.name, 'greet');
      
      // Update state immediately: start leaving, clear selection
      setGameState(prev => ({
        ...prev,
        isCustomerLeaving: true,
        selectedBottle: null, 
        showConfirmButton: false
      }));

      // Wait for leaving animation before updating score/index and resetting leaving state
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1,
          currentCustomerIndex: prev.currentCustomerIndex + 1,
          timeLeft: 30,
          isCustomerLeaving: false
        }));
      }, 1000); 
    } else {
      console.log("Incorrect answer confirmed for", currentCustomer.name);
      playGenericAudio('wrong.mp3'); 
      playCustomerAudio(currentCustomer.name, 'fail');
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        gameOverReason: 'wrongAnswer'
      }));
    }
  };

  const resetToStartScreen = () => {
    setGameState({
      currentCustomerIndex: 0,
      score: 0,
      isGameOver: false,
      selectedBottle: null,
      timeLeft: 30,
      showConfirmButton: false,
      isCustomerLeaving: false,
      isGameStarted: false,
      gameOverReason: null
    });
    // Stop any lingering audio? Maybe not needed if handled by play functions.
  };

  // Play dialogue when customer appears
  useEffect(() => {
    // Define the play function
    const playDialogue = () => {
      // Check conditions *again* when the timeout fires
      if (gameState.isGameStarted && !gameState.isGameOver && !gameState.isCustomerLeaving) {
        const customerIndex = gameState.currentCustomerIndex;
        const currentCustomer = customers[customerIndex];
        
        if (currentCustomer) { // Check if customer exists at this index
          // Remove the index check, always play dialogue
          console.log('Timeout finished, attempting to play dialogue for:', currentCustomer.name);
          playCustomerAudio(currentCustomer.name, 'dialogue'); 
        } else {
          console.log('Timeout finished, but no customer found at index:', customerIndex);
        }
      } else {
        console.log('Timeout finished, but conditions no longer met for dialogue.');
      }
    };

    // Conditions for setting the timeout
    const customerForEffect = customers[gameState.currentCustomerIndex];
    if (gameState.isGameStarted && !gameState.isGameOver && !gameState.isCustomerLeaving && customerForEffect) {
      console.log('Customer index changed/game started, setting timeout for dialogue:', customerForEffect.name); // Update log message
      // Set timeout to match animation
      const dialogueTimer = setTimeout(playDialogue, 1000);

      // Cleanup function
      return () => {
        console.log('Cleanup: Clearing dialogue timer for index:', gameState.currentCustomerIndex);
        clearTimeout(dialogueTimer);
      };
    } else {
      // Conditions not met log remains the same
      console.log('Conditions not met for setting dialogue timeout on effect run. Index:', gameState.currentCustomerIndex, 'isGameStarted:', gameState.isGameStarted, 'isGameOver:', gameState.isGameOver, 'isCustomerLeaving:', gameState.isCustomerLeaving);
    }

  }, [gameState.currentCustomerIndex, gameState.isGameStarted]); // Depend on index AND isGameStarted

  // Timer effect
  useEffect(() => {
    if (gameState.isGameStarted && !gameState.isGameOver && !gameState.isCustomerLeaving) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.isGameStarted, gameState.isGameOver, gameState.isCustomerLeaving]); // Add isGameStarted dependency

  // Time up effect
  useEffect(() => {
    if (gameState.timeLeft <= 0 && !gameState.isGameOver) { // Ensure it only triggers once
      console.log('Time ran out!');
      playGenericAudio('game-over.mp3'); // Play generic game over sound
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        gameOverReason: 'timeOut' // Set reason
      }));
    }
  }, [gameState.timeLeft, gameState.isGameOver]); // Add isGameOver to dependencies

  // Victory condition effect
  useEffect(() => {
    if (!gameState.isGameOver && gameState.currentCustomerIndex >= customers.length) {
      console.log("Victory!");
      playGenericAudio('congratulations.mp3'); // Play victory sound
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        gameOverReason: 'victory'
      }));
    }
    // Add isGameOver to dependencies to prevent triggering sound after restart
  }, [gameState.currentCustomerIndex, customers.length, gameState.isGameOver]);

  // Play start sound when game starts
  useEffect(() => {
    if (gameState.isGameStarted) {
      // Check if this is the *first* time the game is starting (index 0)
      // to prevent playing on restart from game over.
      if (gameState.currentCustomerIndex === 0 && !gameState.isGameOver && !gameState.isCustomerLeaving) {
          console.log("Game started, playing start sound.");
          playGenericAudio('start.wav');
      }
    }
    // Only depend on isGameStarted to trigger this specific effect
  }, [gameState.isGameStarted]);

  // Get the customer object based on the current index
  const customerForBoard = customers[gameState.currentCustomerIndex];

  // Determine the customer relevant for the Game Over screen
  let customerForGameOver = null;
  if (gameState.gameOverReason === 'wrongAnswer' || gameState.gameOverReason === 'timeOut') {
      // If game ended on wrong answer or timeout, use the current index
      customerForGameOver = customers[gameState.currentCustomerIndex];
  } // For 'victory', lastCustomer is not displayed in the same way

  return (
    <AppContainer>
      {!gameState.isGameStarted ? (
        <StartScreen onStart={handleStartGame} />
      ) : gameState.isGameOver ? (
        <GameOverScreen 
          score={gameState.score} 
          onRestart={resetToStartScreen}
          reason={gameState.gameOverReason}
          // Pass the customer who was active during the fail, if applicable
          lastCustomer={customerForGameOver} 
        />
      ) : customerForBoard ? (
        <GameBoard 
          gameState={gameState}
          onBottleSelect={handleBottleSelect}
          onBottleDeselect={handleBottleDeselect}
          onConfirm={handleConfirm}
          bottles={bottles}
          currentCustomer={customerForBoard} // Pass the valid customer object
        />
      ) : (
        // Render null or loading indicator briefly while state transitions to GameOver
        null 
      )}
    </AppContainer>
  );
};

export default App; 