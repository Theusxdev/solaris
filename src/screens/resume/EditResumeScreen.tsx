import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    useNavigation,
    useRoute,
} from '@react-navigation/native';

import { useSavedResumes } from '../../context/SavedResumesContext';
import { useEffect, useState } from 'react';

export default function EditResumeScreen() {
    const navigation = useNavigation();

    const route = useRoute();

    const {
        savedResumes,
        updateResume,
    } = useSavedResumes();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    const { resumeId } = route.params as {
        resumeId: string;
    };

    function handleSave() {
        if (!savedResume) {
            return;
        }

        updateResume(savedResume.id, {
            ...savedResume.data,
            personal: {
                ...savedResume.data.personal,
                name,
                email,
                phone,
                city,
            },
        });

        navigation.goBack();
    }

    const savedResume = savedResumes.find(
        (item) => item.id === resumeId,
    );


    useEffect(() => {
        if (!savedResume) {
            return;
        }

        setName(savedResume.data.personal.name);
        setEmail(savedResume.data.personal.email);
        setPhone(savedResume.data.personal.phone);
        setCity(savedResume.data.personal.city);
    }, [savedResume]);

    if (!savedResume) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorTitle}>
                    Currículo não encontrado
                </Text>

                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
                        Voltar
                    </Text>
                </Pressable>
            </View>
        );
    }

    const { data } = savedResume;


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
                        ← Voltar
                    </Text>
                </Pressable>

                <Text style={styles.title}>
                    Editar currículo
                </Text>

                <Text style={styles.subtitle}>
                    Edite as informações do seu currículo
                </Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Dados pessoais
                    </Text>

                    <Text style={styles.label}>
                        Nome completo
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#6F7B88"
                    />

                    <Text style={styles.label}>
                        E-mail
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#6F7B88"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>
                        Telefone
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Digite seu telefone"
                        placeholderTextColor="#6F7B88"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>
                        Cidade
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Digite sua cidade"
                        placeholderTextColor="#6F7B88"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Objetivo profissional
                    </Text>

                    <Text style={styles.label}>
                        Cargo desejado
                    </Text>

                    <Text style={styles.value}>
                        {data.objective.desiredPosition ||
                            'Não informado'}
                    </Text>

                    <Text style={styles.label}>
                        Área
                    </Text>

                    <Text style={styles.value}>
                        {data.objective.area || 'Não informado'}
                    </Text>

                    <Text style={styles.label}>
                        Nível
                    </Text>

                    <Text style={styles.value}>
                        {data.objective.level || 'Não informado'}
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Experiências
                    </Text>

                    {data.experiences.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Nenhuma experiência cadastrada.
                        </Text>
                    ) : (
                        data.experiences.map((experience) => (
                            <View
                                key={experience.id}
                                style={styles.item}
                            >
                                <Text style={styles.itemTitle}>
                                    {experience.position}
                                </Text>

                                <Text style={styles.itemText}>
                                    {experience.company}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Formação acadêmica
                    </Text>

                    {data.education.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Nenhuma formação cadastrada.
                        </Text>
                    ) : (
                        data.education.map((education) => (
                            <View
                                key={education.id}
                                style={styles.item}
                            >
                                <Text style={styles.itemTitle}>
                                    {education.course}
                                </Text>

                                <Text style={styles.itemText}>
                                    {education.institution}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Habilidades
                    </Text>

                    {data.skills.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Nenhuma habilidade cadastrada.
                        </Text>
                    ) : (
                        <View style={styles.skills}>
                            {data.skills.map((skill) => (
                                <View
                                    key={skill}
                                    style={styles.skill}
                                >
                                    <Text style={styles.skillText}>
                                        {skill}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <Pressable
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>
                        Salvar alterações
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0F14',
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },

    backButtonText: {
        color: '#F5B942',
        fontSize: 14,
        fontWeight: '600',
    },

    title: {
        color: '#F5F7FA',
        fontSize: 28,
        fontWeight: '700',
    },

    subtitle: {
        color: '#7E8A97',
        fontSize: 14,
        marginTop: 6,
        marginBottom: 24,
    },

    card: {
        backgroundColor: '#111820',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
    },

    sectionTitle: {
        color: '#F5F7FA',
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 18,
    },

    label: {
        color: '#6F7B88',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 4,
    },

    value: {
        color: '#F5F7FA',
        fontSize: 14,
    },

    input: {
        height: 46,
        backgroundColor: '#0B0F14',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 11,
        paddingHorizontal: 14,
        color: '#F5F7FA',
        fontSize: 14,
        marginBottom: 8,
    },

    item: {
        paddingBottom: 14,
        marginBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#28313C',
    },

    itemTitle: {
        color: '#F5F7FA',
        fontSize: 14,
        fontWeight: '700',
    },

    itemText: {
        color: '#AAB4BF',
        fontSize: 13,
        marginTop: 4,
    },

    emptyText: {
        color: '#6F7B88',
        fontSize: 13,
    },

    skills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    skill: {
        backgroundColor: '#1D2732',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    skillText: {
        color: '#AAB4BF',
        fontSize: 12,
    },

    errorTitle: {
        color: '#F5F7FA',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 100,
    },

    saveButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F5B942',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },

    saveButtonText: {
        color: '#0B0F14',
        fontSize: 14,
        fontWeight: '700',
    },
});