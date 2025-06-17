import { fetchProfile } from "@/actions/actions";
import ProfileInfo from "@/components/profile/ProfileInfo";

const ProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <main className="py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileInfo profile={profile} />
    </main>
  );
};

export default ProfilePage;
