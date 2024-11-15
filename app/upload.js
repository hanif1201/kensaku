import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { recognizeNotesFromPDF } from "../services/noteRecognition";
import { uploadFile } from "../services/appwrite";

export default function UploadScreen({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recognizedNotes, setRecognizedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pickPDF = async () => {
    setIsLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setSelectedFile(result);

        // Recognize notes
        const notes = await recognizeNotesFromPDF(result.uri);
        setRecognizedNotes(notes);

        // Upload to Appwrite
        await uploadFile(result);

        // Navigate to results
        navigation.navigate("Results", { notes });
      }
    } catch (error) {
      console.error("PDF selection error", error);
      Alert.alert("Error", "Failed to process PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#6200ee' />
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={pickPDF}>
          <Text style={styles.uploadButtonText}>Select PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  uploadButton: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
