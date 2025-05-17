import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const router = useRouter();
  const [type, setType] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (!permission) {
        await requestPermission();
      }
      if (!mediaPermission) {
        await requestMediaPermission();
      }
    })();
  }, []);

  if (!permission || !mediaPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted || !mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera and save photos</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={async () => {
            await requestPermission();
            await requestMediaPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => {
      switch (current) {
        case 'off': return 'on';
        case 'on': return 'auto';
        case 'auto': return 'off';
        default: return 'off';
      }
    });
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      setLastPhoto(photo.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    } catch (error) {
      console.error('Failed to take picture:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={type}
        flash={flash}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <Text style={styles.buttonText}>
              Flash: {flash.charAt(0).toUpperCase() + flash.slice(1)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>

        {lastPhoto && (
          <View style={styles.preview}>
            <Image
              source={{ uri: lastPhoto }}
              style={styles.previewImage}
            />
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
  preview: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 80,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
}); 