import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { useSavedResumes } from '../../context/SavedResumesContext';

type RootStackParamList = {
  MainTabs: undefined;
  Profile: undefined;
  Applications: undefined;
  CreateResume: undefined;
  ResumeDetails: {
    resumeId: string;
  };
  EditResume: {
    resumeId: string;
  };
};

export default function ResumesScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  const { savedResumes } = useSavedResumes();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CABEÇALHO */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Meus currículos
          </Text>

          <Text style={styles.subtitle}>
            Gerencie seus currículos profissionais
          </Text>
        </View>

        {/* CURRÍCULOS */}

        <View style={styles.resumeList}>
          {savedResumes.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>
                📄
              </Text>

              <Text style={styles.emptyTitle}>
                Nenhum currículo criado
              </Text>

              <Text style={styles.emptyText}>
                Crie seu primeiro currículo profissional
                para começar.
              </Text>
            </View>
          ) : (
            savedResumes.map((savedResume) => {
              const { data } = savedResume;

              const title =
                data.objective.desiredPosition ||
                data.experiences[0]?.position ||
                data.personal.name ||
                'Currículo sem título';

              return (
                <View
                  key={savedResume.id}
                  style={styles.resumeCard}
                >
                  <View style={styles.resumeHeader}>
                    <View style={styles.documentIcon}>
                      <Text style={styles.documentIconText}>
                        📄
                      </Text>
                    </View>

                    <View style={styles.resumeInfo}>
                      <Text style={styles.resumeTitle}>
                        {title}
                      </Text>

                      <Text style={styles.updated}>
                        Atualizado{' '}
                        {new Date(
                          savedResume.updatedAt,
                        ).toLocaleDateString('pt-BR')}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>
                      Perfil completo
                    </Text>

                    <Text style={styles.progressValue}>
                      100%
                    </Text>
                  </View>

                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progress,
                        {
                          width: '100%',
                        },
                      ]}
                    />
                  </View>

                  <View style={styles.actions}>
                    <Pressable
                      style={styles.secondaryButton}
                      onPress={() =>
                        navigation.navigate('EditResume', {
                          resumeId: savedResume.id,
                        })
                      }
                    >
                      <Text style={styles.secondaryButtonText}>
                        Editar
                      </Text>
                    </Pressable>

                    <Pressable
                      style={styles.primaryButton}
                      onPress={() =>
                        navigation.navigate('ResumeDetails', {
                          resumeId: savedResume.id,
                        })
                      }
                    >
                      <Text style={styles.primaryButtonText}>
                        Visualizar
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })
          )}
        </View>


        {/* CRIAR CURRÍCULO */}

        <Pressable
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateResume' as never)}
        >
          <View style={styles.createIcon}>
            <Text style={styles.createIconText}>
              +
            </Text>
          </View>

          <View>
            <Text style={styles.createTitle}>
              Criar novo currículo
            </Text>

            <Text style={styles.createSubtitle}>
              Comece um novo currículo profissional
            </Text>
          </View>
        </Pressable>
      </ScrollView >
    </View >
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
    paddingBottom: 30,
  },

  // HEADER

  header: {
    marginBottom: 24,
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
  },

  // LISTA

  resumeList: {
    gap: 16,
  },


  emptyCard: {
    alignItems: 'center',

    backgroundColor: '#111820',

    borderWidth: 1,
    borderColor: '#28313C',

    borderRadius: 18,

    paddingHorizontal: 24,
    paddingVertical: 36,
  },

  emptyIcon: {
    fontSize: 38,

    marginBottom: 14,
  },

  emptyTitle: {
    color: '#F5F7FA',

    fontSize: 17,
    fontWeight: '700',

    marginBottom: 8,
  },

  emptyText: {
    color: '#6F7B88',

    fontSize: 13,

    textAlign: 'center',

    lineHeight: 20,
  },

  // CARD

  resumeCard: {
    backgroundColor: '#111820',

    borderWidth: 1,
    borderColor: '#28313C',

    borderRadius: 18,

    padding: 18,
  },

  resumeHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,
  },

  documentIcon: {
    width: 46,
    height: 46,

    borderRadius: 13,

    backgroundColor: '#1D2732',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  documentIconText: {
    fontSize: 22,
  },

  resumeInfo: {
    flex: 1,
  },

  resumeTitle: {
    color: '#F5F7FA',

    fontSize: 16,
    fontWeight: '700',
  },

  updated: {
    color: '#6F7B88',

    fontSize: 12,

    marginTop: 4,
  },

  // PROGRESSO

  progressHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 8,
  },

  progressLabel: {
    color: '#AAB4BF',

    fontSize: 12,
  },

  progressValue: {
    color: '#F5B942',

    fontSize: 12,
    fontWeight: '700',
  },

  progressBackground: {
    height: 7,

    backgroundColor: '#28313C',

    borderRadius: 10,

    overflow: 'hidden',
  },

  progress: {
    height: '100%',

    backgroundColor: '#F5B942',

    borderRadius: 10,
  },

  // BOTÕES

  actions: {
    flexDirection: 'row',

    gap: 10,

    marginTop: 18,
  },

  secondaryButton: {
    flex: 1,

    height: 42,

    borderRadius: 11,

    borderWidth: 1,
    borderColor: '#34404D',

    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: '#AAB4BF',

    fontSize: 13,
    fontWeight: '600',
  },

  primaryButton: {
    flex: 1,

    height: 42,

    borderRadius: 11,

    backgroundColor: '#F5B942',

    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#0B0F14',

    fontSize: 13,
    fontWeight: '700',
  },

  // CRIAR

  createButton: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#111820',

    borderWidth: 1,
    borderColor: '#F5B942',

    borderRadius: 18,

    padding: 18,

    marginTop: 18,
  },

  createIcon: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: '#F5B942',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  createIconText: {
    color: '#0B0F14',

    fontSize: 28,

    fontWeight: '400',

    lineHeight: 30,
  },

  createTitle: {
    color: '#F5F7FA',

    fontSize: 15,
    fontWeight: '700',
  },

  createSubtitle: {
    color: '#6F7B88',

    fontSize: 12,

    marginTop: 4,
  },
});