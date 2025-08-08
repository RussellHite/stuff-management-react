import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getEnvironmentConfig, getCurrentEnvironment } from '../utils/environment';
import { tokens, semanticColors } from '../design';

interface EnvironmentIndicatorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const EnvironmentIndicator: React.FC<EnvironmentIndicatorProps> = ({ 
  position = 'top-right' 
}) => {
  const { showEnvironmentIndicator } = getEnvironmentConfig();
  
  // Don't show in production
  if (!showEnvironmentIndicator) {
    return null;
  }

  const environment = getCurrentEnvironment();
  
  // Only show for non-production environments
  if (environment === 'production') {
    return null;
  }

  const getEnvironmentColor = () => {
    switch (environment) {
      case 'development':
        return '#10B981'; // Green
      default:
        return '#F59E0B'; // Orange
    }
  };

  const getEnvironmentLabel = () => {
    switch (environment) {
      case 'development':
        return 'DEV';
      default:
        return 'PREVIEW';
    }
  };

  const positionStyles = {
    'top-left': { top: 50, left: 10 },
    'top-right': { top: 50, right: 10 },
    'bottom-left': { bottom: 50, left: 10 },
    'bottom-right': { bottom: 50, right: 10 },
  };

  return (
    <View style={[styles.container, positionStyles[position]]}>
      <View style={[styles.indicator, { backgroundColor: getEnvironmentColor() }]}>
        <Text style={styles.text}>{getEnvironmentLabel()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
  },
  indicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 40,
    alignItems: 'center',
    shadowColor: semanticColors.text.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  text: {
    color: tokens.colors.white,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.5,
  },
});