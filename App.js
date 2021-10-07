import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

const { width, height } = Dimensions.get("window");

export default function App() {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const sight = useRef();

	const snap = async () => {
		try {
			if (sight.current) {
				let { uri } = await sight.current.takePictureAsync({
					quality: 1,
				});
				if (uri) {
					upload(uri)
						.then(() => {
							alert("success");
						})
						.catch((error) => {
							alert(error);
						});
				}
			}
		} catch (error) {
			alert(error);
		}
	};

	const upload = async (uri) => {
		try {
			const response = await fetch(uri);
			const blob = await response.blob();
			const storageRef = ref(storage, "images/" + Date.now());
			return uploadBytes(storageRef, blob);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={sight}></Camera>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
					}}
				>
					<MaterialIcons
						name="flip-camera-ios"
						size={40}
						color="black"
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={snap}>
					<Ionicons
						name="md-scan-circle-sharp"
						size={40}
						color="black"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	camera: {
		width: width - 100,
		height: height / 2,
	},
	buttonContainer: {
		marginTop: 50,
	},
});
